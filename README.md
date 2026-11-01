# MANAS — Real-Life Tactical Mentor & Multi-Perspective Decision Engine

A game-theory and psychology-grounded life mentorship platform. **Zero hollow consoling, zero toxic positivity**—just objective reality checks, power dynamic audits, and conditional if/then decision trees.

## Core Features & Multi-Perspective Architecture

Whenever a dilemma is analyzed across any of the 4 domains (**Dating & Relationships**, **Family Expectations**, **Work & Career**, **Friendship & Social**), the system generates a 7-perspective tactical dossier:

1. **Epistemic Reality Check (Facts vs. Emotional Assumptions)**: Filters out cognitive distortions and anxiety projections from verified physical events.
2. **Psychological Diagnosis & Hard Truth**: Identifies the underlying dynamic (e.g. intermittent reinforcement, enmeshment, conscientiousness exploitation) and reveals user blind spots.
3. **Leverage & Power Dynamic Audit**: Analyzes current power balance, pinpoints exact behavioral power leaks, and provides immediate frame-reclaim moves.
4. **Primary Communication Script**: Word-for-word, calibrated, non-reactive scripts ready to copy and send.
5. **Conditional Scenario Matrix (If/Then Decision Tree)**:
   - **Scenario A (Receptive / Apologetic)**: The trap of premature forgiveness & the countermove.
   - **Scenario B (Defensive / DARVO Attack)**: Deflecting guilt and holding firm boundaries.
   - **Scenario C (Stonewalling / Silent Treatment)**: Interpreting silence as a boundary and deploying tactical no-contact.
6. **Conversational Counter-Script Matrix**: Rapid-fire rebuttal cards addressing manipulation tactics (*"If they say X → Psychological tactic used → Your exact counter Y"*).
7. **Long-Term Risk vs. Reward**: 6-month comparative projection of inaction vs. setting boundaries.

## Additional Modules

- **Live Mentor Chat (Multi-Turn Conversational Memory + Gemini AI)**:
  - **Multi-Turn Session Memory**: Tracks conversation history across turns, remembers names/disclosures, detects bargaining/relapses, and prevents circular excuses.
  - **Google Gemini API Support**: Automatically uses `gemini-2.5-flash` via the official `google-genai` SDK whenever `GEMINI_API_KEY` is set in `.env.local`, with intelligent fallback to local Adaptive Memory.
  - **Typing State & Engine Badging**: Dynamic UI feedback with live typing dots and engine indicators.
- **Saved Playbooks**: Local-first storage to archive tactical breakdowns and scripts for later review.
- **Emergency Helplines**: 24/7 verified crisis support contacts (Tele-MANAS, KIRAN, Vandrevala, 988, 111).

## Architecture & Tech Stack

- **Backend**: Python 3.13 + FastAPI + Uvicorn with Pydantic schemas.
- **Frontend**: Clean, responsive HTML5 + CSS3 + Vanilla JavaScript with interactive tab switchers and light/dark theme support.
- **Single Port**: Entire stack runs unified on `http://localhost:3000`. No Node.js or React runtime required.

## Quick Start

```bash
# 1. Activate Python virtual environment
source .venv/bin/activate

# 2. Start the server
python backend/main.py

# 3. Open in your browser
open http://localhost:3000
```
