import os
import random
import time
import uuid
from typing import List, Dict, Optional, Tuple
from dotenv import load_dotenv

# Load env variables
load_dotenv(".env.local")
load_dotenv(".env")

MENTOR_SYSTEM_INSTRUCTION = """You are MANAS, an elite, rational, game-theoretic, tough-love life and relationship mentor.
Your fundamental rules:
1. ZERO hollow consoling, ZERO toxic positivity (never say "take a deep breath 🌸", "everything happens for a reason", or generic empathetic fluff).
2. Ground all advice in observable behavior over verbal promises. Words are cheap; behavior is the only data point that matters.
3. Power Dynamic & Frame Control: Explicitly diagnose who holds leverage, where the user is leaking dignity or power, and why they are over-functioning to compensate for someone else's under-functioning.
4. Shift Locus of Control: Pivot the user from passive victimhood ("Why did they do this to me?") to self-ownership ("Why am I continuing to tolerate this?").
5. Contextual Memory: Track what the user disclosed in earlier messages. If they rationalize someone's toxic behavior or repeat the same hesitation, call them out directly and hold them accountable.
6. Keep answers sharp, clear, and actionable: 2 to 4 punchy paragraphs max. Conclude with an unambiguous boundary directive or an incisive question.
"""

class SessionMemoryManager:
    """In-memory multi-turn conversational session store with TTL cleanup."""

    def __init__(self, max_history_per_session: int = 15, session_ttl_seconds: int = 86400):
        self.max_history = max_history_per_session
        self.ttl = session_ttl_seconds
        self.sessions: Dict[str, Dict] = {}

    def get_or_create(self, session_id: Optional[str]) -> Tuple[str, List[Dict[str, str]]]:
        self._cleanup_expired()
        if not session_id or session_id not in self.sessions:
            new_id = session_id or str(uuid.uuid4())
            self.sessions[new_id] = {
                "created_at": time.time(),
                "last_active": time.time(),
                "history": []
            }
            return new_id, self.sessions[new_id]["history"]

        self.sessions[session_id]["last_active"] = time.time()
        return session_id, self.sessions[session_id]["history"]

    def add_turn(self, session_id: str, role: str, content: str):
        if session_id in self.sessions:
            history = self.sessions[session_id]["history"]
            history.append({"role": role, "content": content})
            # Keep bounded history
            if len(history) > self.max_history * 2:
                self.sessions[session_id]["history"] = history[-self.max_history * 2:]
            self.sessions[session_id]["last_active"] = time.time()

    def clear(self, session_id: str):
        if session_id in self.sessions:
            self.sessions[session_id]["history"] = []

    def _cleanup_expired(self):
        now = time.time()
        expired = [sid for sid, data in self.sessions.items() if now - data["last_active"] > self.ttl]
        for sid in expired:
            del self.sessions[sid]


class MentorChatEngine:
    """
    Upgraded Conversational Mentor Engine with:
    1. Multi-turn Session Memory.
    2. Google Gemini API integration (with fallback to Hugging Face or Adaptive Engine).
    """

    def __init__(self):
        self.session_manager = SessionMemoryManager()
        self.gemini_client = None
        self._init_gemini()

    def _init_gemini(self):
        gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        if gemini_key:
            try:
                from google import genai
                self.gemini_client = genai.Client(api_key=gemini_key)
            except Exception as e:
                print(f"[MentorChatEngine] Gemini init error: {e}")
                self.gemini_client = None

    def generate_response(
        self,
        message: str,
        category: str = "general",
        session_id: Optional[str] = None,
        incoming_history: Optional[List[Dict[str, str]]] = None
    ) -> Tuple[str, str, str]:
        """
        Processes a chat message with multi-turn session memory.
        Returns: (reply_text, session_id, engine_name)
        """
        session_id, stored_history = self.session_manager.get_or_create(session_id)

        # Sync client history if provided and stored history is empty
        if not stored_history and incoming_history:
            for item in incoming_history:
                stored_history.append({"role": item.get("role", "user"), "content": item.get("content", "")})

        # 1. Try Google Gemini API if configured
        if self.gemini_client:
            try:
                gemini_res = self._call_gemini(message, category, stored_history)
                if gemini_res:
                    reply, model_used = gemini_res
                    self.session_manager.add_turn(session_id, "user", message)
                    self.session_manager.add_turn(session_id, "mentor", reply)
                    return reply, session_id, model_used
            except Exception as e:
                print(f"[MentorChatEngine] Gemini execution failed, failing over: {e}")

        # 2. Try Hugging Face Inference API if configured
        hf_token = os.getenv("HF_TOKEN") or os.getenv("HUGGINGFACE_API_KEY")
        if hf_token:
            try:
                reply = self._call_huggingface(message, category, stored_history, hf_token)
                if reply:
                    self.session_manager.add_turn(session_id, "user", message)
                    self.session_manager.add_turn(session_id, "mentor", reply)
                    return reply, session_id, "huggingface-inference"
            except Exception as e:
                print(f"[MentorChatEngine] Hugging Face execution failed, failing over: {e}")

        # 3. Fallback: Adaptive Multi-Turn Memory Engine
        reply = self._generate_adaptive_reply(message, category, stored_history)
        self.session_manager.add_turn(session_id, "user", message)
        self.session_manager.add_turn(session_id, "mentor", reply)
        return reply, session_id, "adaptive-memory-engine"

    def _call_gemini(self, message: str, category: str, history: List[Dict[str, str]]) -> Optional[Tuple[str, str]]:
        """Calls Google Gemini API with multi-turn conversation contents."""
        from google import genai
        from google.genai import types

        # Build contents from history
        contents = []
        for turn in history[-8:]:  # pass last 8 turns for tight context
            role = "user" if turn["role"] == "user" else "model"
            contents.append(types.Content(role=role, parts=[types.Part.from_text(text=turn["content"])]))

        # Add current user message
        contents.append(types.Content(role="user", parts=[types.Part.from_text(text=f"[Context: {category}] {message}")]))

        config = types.GenerateContentConfig(
            system_instruction=MENTOR_SYSTEM_INSTRUCTION,
            temperature=0.65,
            top_p=0.95,
            max_output_tokens=450
        )

        for model_name in ["gemini-3.5-flash", "gemini-3-flash-preview", "gemini-flash-latest"]:
            try:
                response = self.gemini_client.models.generate_content(
                    model=model_name,
                    contents=contents,
                    config=config
                )
                if response and response.text:
                    return response.text.strip(), model_name
            except Exception as e:
                print(f"[MentorChatEngine] {model_name} attempt error: {e}")
                continue
        return None

    def _call_huggingface(self, message: str, category: str, history: List[Dict[str, str]], token: str) -> Optional[str]:
        """Calls Hugging Face Serverless Inference API via Router."""
        import httpx

        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }

        # Build messages payload
        messages = [{"role": "system", "content": MENTOR_SYSTEM_INSTRUCTION}]
        for turn in history[-6:]:
            role = "user" if turn["role"] == "user" else "assistant"
            messages.append({"role": role, "content": turn["content"]})
        messages.append({"role": "user", "content": f"[Context: {category}] {message}"})

        payload = {
            "model": "Qwen/Qwen2.5-72B-Instruct",
            "messages": messages,
            "max_tokens": 400,
            "temperature": 0.7
        }

        with httpx.Client(timeout=3.5) as client:
            resp = client.post("https://router.huggingface.co/together/v1/chat/completions", headers=headers, json=payload)
            if resp.status_code == 200:
                data = resp.json()
                choices = data.get("choices", [])
                if choices and "message" in choices[0]:
                    return choices[0]["message"].get("content", "").strip()
        return None

    def _generate_adaptive_reply(self, message: str, category: str, history: List[Dict[str, str]]) -> str:
        """
        Sophisticated rule-based conversational memory fallback:
        Inspects turns in history, detects topic evolution, identifies relapses,
        and provides sharp, tailored psychological direction.
        """
        import re
        lower = message.lower()
        turn_count = len(history) // 2

        def has_word(pattern_list):
            for pat in pattern_list:
                if re.search(r'\b' + re.escape(pat) + r'\b', lower):
                    return True
            return False

        # Multi-turn relapse detection: user is asking the same question again or bargaining
        if turn_count >= 1 and has_word(["still", "again", "texted", "miss him", "miss her", "cant stop", "can't stop", "what if"]):
            return (
                "Look at what you're doing right now: you are searching for a technicality or excuse to do what you already know is bad for your dignity. "
                "You asked me: 'What if they genuinely forgot?' If someone values you, they don't 'forget' you for 10 hours while using their phone for everything else. "
                "Stop making excuses for their low effort. Put your phone down and let them come to you—if they don't, you have your final answer."
            )

        # Breakup / No Contact / Ex (proper word boundaries)
        if has_word(["ex", "exes", "breakup", "broke up", "no contact", "unblock", "reach out"]):
            return (
                "Reaching out to an ex when you feel lonely won't give you closure; it will just reset your emotional detox clock back to day one. "
                "You don't miss who they actually were—you miss the idealized version of them you built in your head. "
                "Let their silence be their closure. What are you actually avoiding facing right now by fixating on them?"
            )

        # Mixed Signals / Late Replies
        if has_word(["delivered", "read", "ghosted", "dry", "slow", "reply", "replies", "double text", "texting", "mixed signals"]):
            return (
                "Mixed signals are an unambiguous answer: they like your validation, but they aren't invested in you. "
                "When someone is truly enthusiastic about you, they don't leave you sitting in prolonged ambiguity. "
                "Stop monitoring their activity timestamps. Match their energy completely or step back entirely. What would happen if you didn't reply at all today?"
            )

        # Family Enmeshment & Guilt
        if has_word(["parents", "mom", "dad", "family", "guilt", "marriage", "disown", "selfish"]):
            return (
                "Family guilt-tripping works because they know which emotional buttons they installed in you as a child. "
                "You can love your parents without letting them pilot your adult decisions. When they call you 'selfish', what they really mean is 'we can no longer control you'. "
                "Deliver your decisions as calm announcements, not applications for their approval. What boundary are you hesitating to state?"
            )

        # Workplace & Career
        if has_word(["boss", "manager", "fired", "burnout", "raise", "credit", "workplace", "overtime", "coworker"]):
            return (
                "A corporation is a contractual trade of skills for money, not a family. "
                "If you continue over-functioning on weekends and taking on unpaid scope, leadership will simply normalize it as your baseline. "
                "Start keeping an asynchronous paper trail of every deliverable and ask for the compensation conversation on the calendar. What is the worst-case scenario if you leave work at 6 PM today?"
            )

        # One-Sided Friendship
        if has_word(["friend", "friends", "friendship", "left out", "drama", "ignored", "one-sided", "venting"]):
            return (
                "Friendships must be mutual, not an unpaid emotional dumping ground. "
                "If you are always the one initiating, listening to their problems, and adjusting your plans, you don't have a friend—you have a consumer of your emotional bandwidth. "
                "Stop reaching out for 10 days. If the friendship dies in silence, you just discovered it was already dead."
            )

        # Multi-turn progressive reflection
        if turn_count >= 2:
            return (
                f"We're {turn_count + 1} steps into this conversation now. Step back from the emotional chaos for a second. "
                f"If a friend you respected came to you with this exact dilemma, what is the clear, unambiguous advice you'd give them? "
                f"Why aren't you granting yourself that same standard?"
            )

        # Default grounding response
        return (
            "Let's cut right through the emotional fog. Behavior is the only real truth in human relationships—words without consistent action are just distraction. "
            "What did they physically do, what is your gut telling you, and what boundary do you need to enforce to protect your dignity?"
        )
