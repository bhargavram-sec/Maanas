from typing import List, Optional
from pydantic import BaseModel, Field

class MentorAdviceRequest(BaseModel):
    category: str = Field(..., description="Life category: 'dating', 'family', 'career', or 'social'")
    situation: str = Field(..., description="Detailed description of the user's dilemma")
    goal: Optional[str] = Field("clarity", description="Desired outcome")

class FactsVsAssumptions(BaseModel):
    verified_facts: List[str]
    emotional_assumptions: List[str]

class LeverageAudit(BaseModel):
    current_dynamic: str
    power_leak: str
    frame_reclaim: str

class ScenarioBranch(BaseModel):
    scenario_id: str
    scenario_title: str
    their_likely_reaction: str
    the_trap: str
    your_countermove: str
    exact_script: str

class CounterScriptItem(BaseModel):
    if_they_say: str
    tactic_used: str
    your_counter: str

class LongTermProjection(BaseModel):
    cost_of_inaction_6_months: str
    payoff_of_boundary: str

class MentorAdviceResponse(BaseModel):
    category: str
    category_label: str
    title: str
    root_diagnosis: str
    hard_truth: str
    facts_vs_assumptions: FactsVsAssumptions
    leverage_audit: LeverageAudit
    scenarios: List[ScenarioBranch]
    counter_scripts: List[CounterScriptItem]
    long_term_projection: LongTermProjection
    primary_script: str
    internal_shift: str

class ChatMessageItem(BaseModel):
    role: str = Field(..., description="'user' or 'mentor'")
    content: str = Field(..., description="Message text")

class ChatRequest(BaseModel):
    message: str = Field(..., description="The user's message to the mentor")
    category: Optional[str] = Field("general", description="Current conversation context")
    session_id: Optional[str] = Field(None, description="Unique session identifier for multi-turn conversational memory")
    history: Optional[List[ChatMessageItem]] = Field(default_factory=list, description="Prior conversation turns for session context")

class ChatResponse(BaseModel):
    reply: str
    session_id: str
    engine_used: str
