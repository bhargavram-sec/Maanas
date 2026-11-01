# MANAS — Real-Life Tactical Mentor & Multi-Perspective Decision Engine

[![Live Demo](https://img.shields.io/badge/Live_Demo-maanas--ai.netlify.app-00ad9f?style=for-the-badge&logo=netlify)](https://maanas-ai.netlify.app/)
[![Python](https://img.shields.io/badge/Python-3.11%20%7C%203.13-3776ab?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.5_Flash-4285f4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)

> **Live Application**: [https://maanas-ai.netlify.app](https://maanas-ai.netlify.app/)

A psychology- and game-theory-grounded life mentorship platform. **Zero hollow consoling, zero toxic positivity**—just objective reality checks, leverage audits, contingency scenario branches, and calibrated communication scripts.

---

## 🎯 The Philosophy: Actionable Truth Over Consoling

Most digital mental health or advice tools offer generic platitudes (*"take a deep breath 🌸"*, *"everything happens for a reason"*), leaving users feeling heard in the moment but completely unequipped to resolve the actual conflict.

**MANAS** operates on **behavioral realism**:
- **Behavior is the only truth**: Words without consistent action are noise.
- **Locus of Control**: Shifts the question from *"Why did they do this to me?"* to *"Why am I continuing to tolerate this?"*.
- **Frame & Leverage**: Analyzes who holds power in the dynamic and stops over-functioning to compensate for someone else's under-functioning.

---

## 🧩 7-Perspective Decision Engine

Whenever a dilemma is submitted across any of the 4 core domains (**Dating & Relationships**, **Family Expectations**, **Work & Career**, **Friendship & Social**), the system generates a 7-perspective tactical dossier:

1. **Epistemic Reality Check (Facts vs. Emotional Assumptions)**: Filters out cognitive distortions and anxiety projections from verified physical events.
2. **Psychological Root Diagnosis & Hard Truth**: Identifies the underlying dynamic (intermittent reinforcement, enmeshment, conscientiousness exploitation, asymmetric friendship) and exposes user blind spots.
3. **Leverage & Power Dynamic Audit**: Analyzes current frame, pinpoints exact behavioral power leaks, and provides immediate frame-reclaim moves.
4. **Primary Communication Script**: Word-for-word, calibrated, non-reactive scripts ready to copy and send.
5. **Conditional Scenario Matrix (If/Then Decision Tree)**:
   - **Scenario A (Receptive / Apologetic)**: The trap of premature forgiveness & the countermove.
   - **Scenario B (Defensive / DARVO Attack)**: Deflecting guilt and holding firm boundaries.
   - **Scenario C (Stonewalling / Silent Treatment)**: Interpreting silence as a boundary and deploying tactical no-contact.
6. **Conversational Counter-Script Matrix**: Rapid-fire rebuttal cards addressing manipulation tactics (*"If they say X → Psychological tactic used → Your exact counter Y"*).
7. **Long-Term Risk vs. Reward**: 6-month comparative projection of inaction vs. holding the boundary.

---

## 💬 Live Mentor Chat (Multi-Turn Memory + Gemini AI)

- **Continuous Session Memory**: Remembers names, past disclosures, and previous advice across conversational turns.
- **Relapse & Bargaining Detection**: Detects when a user tries to rationalize bad behavior or bargain away their standards and holds them accountable.
- **Google Gemini API Support**: Powered by `gemini-3.5-flash` via the official `google-genai` SDK with full multi-turn conversational context.
- **Offline Adaptive Memory Fallback**: Intelligently falls back to an offline rule-based psychological memory engine if an API key is not present.

---

## 🛠️ Tech Stack & Architecture

- **Backend**: Python 3 (FastAPI, Uvicorn, Pydantic, python-dotenv).
- **AI / LLM Integration**: Official `google-genai` SDK (`gemini-3.5-flash` / `gemini-3.8-flash`).
- **Serverless Adapter**: `mangum` ASGI adapter for Netlify serverless functions.
- **Frontend**: Clean, editorial HTML5, CSS3 (dynamic category themes, dark/light mode), and lightweight Vanilla JavaScript.
- **Zero Heavy Frameworks**: No Node.js or React runtime overhead in production.

---

## 🚀 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bhargavram-sec/Manas.git
   cd Manas
   ```

2. **Set up Python virtual environment**:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local` and add your Gemini API key:
   ```bash
   cp .env.example .env.local
   # Edit .env.local:
   # GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the server**:
   ```bash
   python backend/main.py
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment

### Netlify (Recommended)
1. Import `bhargavram-sec/Manas` into Netlify.
2. Netlify automatically reads `netlify.toml` and routes static assets to `static/` and API calls to `netlify/functions/api.py`.
3. Add `GEMINI_API_KEY` under **Site configuration → Environment variables**.
4. Live site: [https://maanas-ai.netlify.app](https://maanas-ai.netlify.app)

### Render
1. Create a Web Service connected to this repository.
2. Set Build Command: `pip install -r requirements.txt`
3. Set Start Command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
4. Add `GEMINI_API_KEY` under Environment Variables.

---

## 🛡️ License

Private educational and college final-year capstone project. All rights reserved.
