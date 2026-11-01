from typing import Dict, List, Optional
from backend.models import (
    MentorAdviceResponse,
    FactsVsAssumptions,
    LeverageAudit,
    ScenarioBranch,
    CounterScriptItem,
    LongTermProjection
)

class LogicalScenarioProtocol:
    def __init__(
        self,
        keywords: List[str],
        title: str,
        root_diagnosis: str,
        hard_truth: str,
        verified_facts: List[str],
        emotional_assumptions: List[str],
        current_dynamic: str,
        power_leak: str,
        frame_reclaim: str,
        scenarios: List[ScenarioBranch],
        counter_scripts: List[CounterScriptItem],
        cost_of_inaction: str,
        payoff_of_boundary: str,
        primary_script: str,
        internal_shift: str
    ):
        self.keywords = keywords
        self.title = title
        self.root_diagnosis = root_diagnosis
        self.hard_truth = hard_truth
        self.verified_facts = verified_facts
        self.emotional_assumptions = emotional_assumptions
        self.current_dynamic = current_dynamic
        self.power_leak = power_leak
        self.frame_reclaim = frame_reclaim
        self.scenarios = scenarios
        self.counter_scripts = counter_scripts
        self.cost_of_inaction = cost_of_inaction
        self.payoff_of_boundary = payoff_of_boundary
        self.primary_script = primary_script
        self.internal_shift = internal_shift

    def match_score(self, text: str) -> int:
        lower = text.lower()
        score = 0
        for kw in self.keywords:
            if kw in lower:
                score += 15
        return score


class MentorEngine:
    """Multi-Perspective Logic & Scenario Decision Tree Mentorship Engine."""

    CATEGORY_LABELS = {
        "dating": "Dating & Relationships",
        "family": "Family Expectations",
        "career": "Work & Career",
        "social": "Friendship & Social"
    }

    def __init__(self):
        self.protocols: Dict[str, List[LogicalScenarioProtocol]] = {
            # ---------------- 1. DATING & RELATIONSHIPS ----------------
            "dating": [
                LogicalScenarioProtocol(
                    keywords=["reply", "text", "delivered", "hours", "late", "ghost", "ignore", "mixed signal", "dry"],
                    title="The Latency Disparity & Intermittent Reinforcement Trap",
                    root_diagnosis="This is an Anxious-Avoidant feedback loop governed by intermittent reinforcement. The inconsistency of their replies triggers adrenaline and dopamine spikes, causing you to mistake anxiety for romantic passion. You are unconsciously monitoring latency to regulate your emotional safety.",
                    hard_truth="Mixed signals are not a mystery to be cracked; they are an unambiguous signal of low investment. A person who is genuinely enthusiastic about you does not create prolonged emotional ambiguity. You are holding on to who they are when they are charming, while ignoring who they are 90% of the week.",
                    verified_facts=[
                        "Their communication cadence is inconsistent and delayed (hours on delivered).",
                        "Their replies are brief, reactive, and rarely initiate deep curiosity about your life.",
                        "You spend significant mental energy analyzing their online timestamps."
                    ],
                    emotional_assumptions=[
                        "Assumption: 'They must be going through something heavy and need my patience.'",
                        "Assumption: 'If I just craft the perfect casual message, their warmth will return.'",
                        "Assumption: 'If I step back, they will forget about me completely.'"
                    ],
                    current_dynamic="You are in the supplicant position, over-functioning to compensate for their under-functioning.",
                    power_leak="Waiting by the phone, constantly re-reading past texts, and replying within 30 seconds the moment they finally text.",
                    frame_reclaim="Match their latency and investment completely. Strip them of unearned access to your immediate emotional availability.",
                    scenarios=[
                        ScenarioBranch(
                            scenario_id="receptive",
                            scenario_title="Scenario A: If They Acknowledge & Apologize",
                            their_likely_reaction="They reply: 'I'm so sorry, work has been genuinely insane. I miss you and want to see you.'",
                            the_trap="Instantly forgiving them and acting like nothing happened, which teaches them that an apology resets the counter with zero behavior change.",
                            your_countermove="Accept the apology graciously without minimizing your standard. Require consistent scheduling.",
                            exact_script="\"Thanks for explaining. I understand work gets busy, but consistent communication matters to me. Let's schedule time when you're actually free so we're not having disjointed conversations.\""
                        ),
                        ScenarioBranch(
                            scenario_id="defensive",
                            scenario_title="Scenario B: If They Get Defensive / Accuse You of Being Clingy",
                            their_likely_reaction="They reply: 'I have a life outside my phone. You're being too needy / demanding.'",
                            the_trap="Writing a 500-word essay explaining why you're not needy, which gives them control over the conversation.",
                            your_countermove="Refuse to defend your sanity. State your requirement factually and disengage.",
                            exact_script="\"Wanting steady, respectful communication isn't clingy; it's my baseline standard. If that feels like too much for you, then we are looking for different things.\""
                        ),
                        ScenarioBranch(
                            scenario_id="silent",
                            scenario_title="Scenario C: If They Ignore or Leave You on Read",
                            their_likely_reaction="Complete silence for 24+ hours or viewing your Instagram stories while ignoring your message.",
                            the_trap="Double-texting ('Did you see my message?') or posting passive-aggressive indirect quotes.",
                            your_countermove="Take the silence as their final, explicit statement. Archive the chat and initiate strict no-contact.",
                            exact_script="[DO NOT MESSAGE THEM]. Silence is their answer. Delete their contact thread and reclaim your focus."
                        )
                    ],
                    counter_scripts=[
                        CounterScriptItem(
                            if_they_say="\"I'm just really bad at texting, you know how I am.\"",
                            tactic_used="Normalizing incompetence to lower your standards.",
                            your_counter="\"I understand texting isn't your priority, but consistent communication is mine. I need someone whose communication style aligns with mine.\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"Why does everything have to be so serious with you?\"",
                            tactic_used="Deflecting responsibility by framing your boundary as drama.",
                            your_counter="\"Having basic standards for how we talk isn't drama. If direct honesty feels heavy to you, that's worth noting.\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"Sorry, was busy. What's up? (after 12 hours)\"",
                            tactic_used="Low-effort breadcrumbing to test if you're still on standby.",
                            your_counter="\"Hey! Tied up with my own evening plans right now. Let's talk later this week.\""
                        )
                    ],
                    cost_of_inaction="In 6 months, you will have exhausted your self-esteem, trained them that your time is cheap, and missed out on partners who communicate with ease.",
                    payoff_of_boundary="Immediate relief from phone anxiety, reclamation of your dignity, and an unambiguous filtering of low-effort connections.",
                    primary_script="\"Hey! I've noticed our communication has been pretty inconsistent lately. I value open, steady effort in my connections. Let me know when you have 10 minutes to talk this week so we're on the same page.\"",
                    internal_shift="You are not a casual hobby to be picked up when someone is bored. Your peace of mind is non-negotiable."
                ),
                LogicalScenarioProtocol(
                    keywords=["ex", "breakup", "miss", "text him", "text her", "back together", "unblock", "check profile"],
                    title="The Dopamine Deficit & Post-Breakup Relapse Dilemma",
                    root_diagnosis="You are experiencing neurochemical dopamine withdrawal, not genuine intuition. The human brain undergoes grief in waves; during acute withdrawal, it selectively suppresses negative memories (fights, disrespect) and amplifies euphoric recall (early romantic dates).",
                    hard_truth="Texting your ex will not grant you closure. Closure is an internal decision to stop reopening a wound, not a collaborative conversation. Reaching out resets your emotional recovery clock to Day 1 and signals that you have no alternatives.",
                    verified_facts=[
                        "The fundamental structural incompatibility or disrespect that caused the split remains unchanged.",
                        "Reaching out has historically led to temporary relief followed by deeper post-interaction regret.",
                        "You are currently vulnerable, lonely, or bored, which distorts rational decision-making."
                    ],
                    emotional_assumptions=[
                        "Assumption: 'Maybe they've finally realized what they lost and changed.'",
                        "Assumption: 'A casual friendly check-in won't hurt anything.'",
                        "Assumption: 'I will never find this exact connection with anyone else.'"
                    ],
                    current_dynamic="You are projecting your healing onto someone who participated in the breakdown of the relationship.",
                    power_leak="Monitoring their Spotify, Instagram following, or checking their last seen timestamp.",
                    frame_reclaim="Total information blackout. Put strict friction between your impulses and your keyboard.",
                    scenarios=[
                        ScenarioBranch(
                            scenario_id="receptive",
                            scenario_title="Scenario A: If They Reply Warmly & Suggest Meeting",
                            their_likely_reaction="They reply: 'I miss you too. Let's grab coffee and catch up.'",
                            the_trap="Jumping back into casual intimacy without any structural proof of therapy, behavioral change, or accountability.",
                            your_countermove="Maintain the boundary. Coffee does not cure fundamental incompatibility.",
                            exact_script="\"I appreciate you checking in, but I need continued space to focus on my own path. Wishing you all the best.\""
                        ),
                        ScenarioBranch(
                            scenario_id="defensive",
                            scenario_title="Scenario B: If They Are Cold or Distant",
                            their_likely_reaction="They reply hours later with: 'Glad you're doing ok' or leave you on seen.",
                            the_trap="Feeling humiliated and sending follow-up justifications ('Sorry, didn't mean to bother you').",
                            your_countermove="Delete the thread immediately. Accept the coldness as the closure you needed.",
                            exact_script="[DO NOT REPLY]. Archive the chat and write out what you felt in your private journal."
                        ),
                        ScenarioBranch(
                            scenario_id="silent",
                            scenario_title="Scenario C: If They Leave It on Delivered",
                            their_likely_reaction="No response at all.",
                            the_trap="Ruminating on why they didn't reply and checking if you're blocked.",
                            your_countermove="Block and delete their number. Take away their ability to disrupt your life whenever they feel bored.",
                            exact_script="[BLOCK & DELETE]. Reclaim your mental space permanently."
                        )
                    ],
                    counter_scripts=[
                        CounterScriptItem(
                            if_they_say="\"Can't we just be mature and stay friends?\"",
                            tactic_used="Keeping you on the bench as an emotional safety net with zero commitment.",
                            your_counter="\"I don't stay in touch with exes while I'm moving forward with my life. I need clean boundaries.\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"I've been thinking about you a lot lately... (at 11:30 PM)\"",
                            tactic_used="Late-night loneliness fishing.",
                            your_counter="\"It's natural to have memories, but our relationship ended for clear reasons. Please respect my space.\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"You gave up on us so easily.\"",
                            tactic_used="Guilt-tripping to deflect from the actions that forced the breakup.",
                            your_counter="\"I endured as much as was healthy. Choosing self-preservation isn't giving up; it's growing up.\""
                        )
                    ],
                    cost_of_inaction="Staying in the ex-orbit keeps you emotionally unavailable for new healthy relationships for 1 to 2 wasted years.",
                    payoff_of_boundary="30 days of strict discipline breaks the chemical bond, restores self-respect, and allows true healing to begin.",
                    primary_script="\"I'm choosing not to stay in touch because I need full space to focus on my life and healing. I wish you the best, but I will be stepping away from communication.\"",
                    internal_shift="What broke you cannot heal you. Never go back to a burning house just because it used to be warm."
                ),
                LogicalScenarioProtocol(
                    keywords=["cheat", "loyalty", "trust", "suspect", "phone", "other girl", "other guy", "hide", "lie"],
                    title="Breach of Trust & The Investigative Trap",
                    root_diagnosis="Deception destabilizes your epistemic reality (your ability to trust your own senses). When a partner engages in secretive conduct, the greatest damage is not just the act—it is the erosion of psychological safety that forces you into the hyper-vigilant role of an investigator.",
                    hard_truth="If you have to inspect someone's notifications, question their whereabouts, and decipher their half-truths, the relationship has already failed its foundational test. You cannot police an adult into loyalty. Loyalty is a voluntary gift; if you have to enforce it, it's counterfeit.",
                    verified_facts=[
                        "Secretive behavior and defensive secrecy have replaced transparency.",
                        "Your instinct is firing because actions and words are not aligning.",
                        "Attempting to talk about it leads to defensiveness or reverse accusations."
                    ],
                    emotional_assumptions=[
                        "Assumption: 'If I just get definitive proof, I will finally have peace.'",
                        "Assumption: 'Maybe I'm just being paranoid like they claim.'",
                        "Assumption: 'They will change if they see how deeply hurt I am.'"
                    ],
                    current_dynamic="They hold the illicit behavior; you hold the burden of proof. The power dynamic is completely inverted.",
                    power_leak="Begging for reassurance, looking through their belongings in panic, or arguing over small details.",
                    frame_reclaim="State the breach as an established fact. Shift from seeking proof to enforcing your standard of integrity.",
                    scenarios=[
                        ScenarioBranch(
                            scenario_id="receptive",
                            scenario_title="Scenario A: If They Show Full Transparency & Remorse",
                            their_likely_reaction="They admit wrongdoing without making excuses, offer full transparency, and commit to couples therapy.",
                            the_trap="Sweeping it under the rug quickly to avoid tension.",
                            your_countermove="Set a trial timeline. Rebuilding trust takes months of consistent, unpoliced verification.",
                            exact_script="\"I hear your remorse. However, words do not rebuild trust—consistent, verifiable behavior over time does. If we are to continue, transparency must be complete and unprompted.\""
                        ),
                        ScenarioBranch(
                            scenario_id="defensive",
                            scenario_title="Scenario B: If They Use DARVO (Deny, Attack, Reverse Victim)",
                            their_likely_reaction="\"You're crazy! How dare you violate my privacy! You're ruining our relationship with your trust issues!\"",
                            the_trap="Defending why you looked at their phone instead of keeping focus on what was found.",
                            your_countermove="Do not take the bait. Label the deflection clearly.",
                            exact_script="\"My decision to check was a response to weeks of gut-wrenching secrecy. We are not discussing my phone checking; we are discussing your actions. If you cannot be honest, we are done.\""
                        ),
                        ScenarioBranch(
                            scenario_id="silent",
                            scenario_title="Scenario C: If They Pack Up or Storm Out",
                            their_likely_reaction="They slam doors, give the silent treatment, or threaten to leave.",
                            the_trap="Running after them to apologize just to stop the conflict.",
                            your_countermove="Let them leave. Do not chase someone who uses abandonment as a manipulation tactic.",
                            exact_script="\"Take the time you need. When you are ready to speak with honesty and accountability, let me know. Until then, I will be taking space.\""
                        )
                    ],
                    counter_scripts=[
                        CounterScriptItem(
                            if_they_say="\"You're so insecure, they're just a friend!\"",
                            tactic_used="Gaslighting to make your intuition feel like a personal defect.",
                            your_counter="\"A friendship that requires secrecy from a romantic partner isn't innocent. Real friendships don't threaten relationships.\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"If you don't trust me, why are you even with me?\"",
                            tactic_used="Using an ultimatum to intimidate you into dropping the subject.",
                            your_counter="\"That is the exact question I am asking myself right now. Without transparency, there is no foundation here.\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"I only hid it because I knew you'd react crazy like this!\"",
                            tactic_used="Blaming the victim for the perpetrator's deceit.",
                            your_counter="\"You hid it because you knew it crossed an ethical line. Do not blame your choice to lie on my reaction to discovering it.\""
                        )
                    ],
                    cost_of_inaction="Remaining in a deceptive dynamic destroys your nervous system, triggers chronic insomnia, and teaches your partner that lying carries no real consequences.",
                    payoff_of_boundary="Reclaiming your psychological sovereignty. You will never have to play detective in your own home again.",
                    primary_script="\"Trust and transparency are absolute baselines for me. What I observed violates both. I am not here to argue over technicalities—I need complete honesty, or I will be stepping away from this relationship.\"",
                    internal_shift="You don't need a confession to walk away from disrespect. Your peace is all the proof you need."
                )
            ],

            # ---------------- 2. FAMILY EXPECTATIONS ----------------
            "family": [
                LogicalScenarioProtocol(
                    keywords=["parent", "mother", "father", "marriage", "arrange", "career", "guilt", "sacrifice", "disown"],
                    title="The Familial Enmeshment & Emotional Debt Extortion",
                    root_diagnosis="Your family operates under emotional enmeshment where autonomy is coded as disloyalty. Parents who invoke 'everything we sacrificed for you' are attempting to convert parental duty into a lifetime debt contract, using guilt as a behavioral leash.",
                    hard_truth="Disappointing your parents is an unavoidable requirement of becoming an autonomous adult. If you live a career or marriage chosen to keep your parents comfortable, you will end up deeply resenting them in 10 years. You cannot outsource your life decisions to people who will not have to live with the daily consequences.",
                    verified_facts=[
                        "Your parents are using emotional coercion (tears, silent treatment, illness threats) to enforce compliance.",
                        "Your personal desires diverge significantly from their cultural expectations.",
                        "Attempting to convince them rationally has failed because their objective is control, not mutual understanding."
                    ],
                    emotional_assumptions=[
                        "Assumption: 'If I just explain it well enough, they will finally approve.'",
                        "Assumption: 'I am a terrible child for causing them emotional distress.'",
                        "Assumption: 'Their health will collapse if I stand my ground.'"
                    ],
                    current_dynamic="They issue ultimatums; you apologize and backtrack. They have learned that sustained guilt guarantees your surrender.",
                    power_leak="Seeking their validation before making major decisions, and engaging in 3-hour emotional arguments that lead nowhere.",
                    frame_reclaim="Stop asking for permission. Deliver decisions as calm, finalized realities, and step out when manipulation begins.",
                    scenarios=[
                        ScenarioBranch(
                            scenario_id="receptive",
                            scenario_title="Scenario A: If They Show Reluctant Acceptance",
                            their_likely_reaction="\"We don't agree with your choice, but we don't want to lose you. We just want you to be happy.\"",
                            the_trap="Over-explaining your choices in relief, which invites them to reopen the debate.",
                            your_countermove="Express gratitude for their love, keep the boundary firm, and change the subject to neutral topics.",
                            exact_script="\"Thank you for respecting my path. Your support means everything to me, and I love you both deeply. Let's focus on enjoying our time together.\""
                        ),
                        ScenarioBranch(
                            scenario_id="defensive",
                            scenario_title="Scenario B: If They Use Severe Emotional Blackmail / Disowning Threats",
                            their_likely_reaction="\"You are killing your mother! You are bringing shame on the family! We will disown you!\"",
                            the_trap="Engaging in screaming matches, begging for their blessing, or capitulating out of panic.",
                            your_countermove="Calmly state that you will not participate in threats, and physically exit the room/call.",
                            exact_script="\"I will not be spoken to with threats or emotional blackmail. I love you, but my decision is finalized. When you are ready to speak with respect, I will gladly talk with you.\""
                        ),
                        ScenarioBranch(
                            scenario_id="silent",
                            scenario_title="Scenario C: If They Enforce the Cold Silent Treatment",
                            their_likely_reaction="Refusing to speak to you for days/weeks, ignoring calls, or using third-party relatives to relay guilt.",
                            the_trap="Breaking first by apologizing for things you didn't do wrong just to end the coldness.",
                            your_countermove="Out-wait the silence. Do not chase. Let them realize that silence will not manipulate you.",
                            exact_script="\"I know you are upset with my decision. When you are ready to resume communication with love and mutual respect, my door is open. Take care.\""
                        )
                    ],
                    counter_scripts=[
                        CounterScriptItem(
                            if_they_say="\"After everything we sacrificed for you, this is how you repay us?\"",
                            tactic_used="Emotional debt weaponization.",
                            your_counter="\"I will always be grateful for your sacrifices as parents. But living my own authentic life is not an act of disrespect; it is what you raised me to do.\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"What will society and relatives say about our family?\"",
                            tactic_used="Prioritizing external social prestige over your personal life fulfillment.",
                            your_counter="\"Relatives will talk for a week and move on to the next topic. I have to live with this decision for the next 50 years. My life comes first.\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"You have changed so much, you are not our sweet child anymore!\"",
                            tactic_used="Pathologizing your healthy adult boundaries as character flaws.",
                            your_counter="\"I haven't changed into a bad person; I have grown into an adult with my own mind. That is something a parent should be proud of.\""
                        )
                    ],
                    cost_of_inaction="Living an arranged career or marriage you despise, waking up at 40 with profound existential bitterness and chronic anxiety.",
                    payoff_of_boundary="Short-term family friction in exchange for lifetime personal freedom, genuine self-respect, and adult agency.",
                    primary_script="\"I love and respect both of you deeply. However, this is my life, and I have made my decision. I want you to be part of my journey, but I will not be debating this choice further.\"",
                    internal_shift="You do not owe your parents your life to repay them for giving you life. Your autonomy is your birthright."
                ),
                LogicalScenarioProtocol(
                    keywords=["money", "financial", "salary", "give money", "support family", "debt", "relatives", "asking for money"],
                    title="Financial Entitlement & Siphoning Boundary Protocol",
                    root_diagnosis="Your family treats your income as an open liquidity pool. When financial boundaries are undefined, dependent relatives treat your earnings as their right while framing your personal savings as greed or selfishness.",
                    hard_truth="You cannot be anyone else's emergency fund while your own retirement, rent, and emergency savings are compromised. Funding chronic poor financial habits under the guise of family loyalty is not generosity—it is enabling.",
                    verified_facts=[
                        "Requests for money are recurring, unbudgeted, and rarely repaid.",
                        "Declining financial requests results in moral condemnation ('you're selfish').",
                        "Your personal financial runway is being actively compromised."
                    ],
                    emotional_assumptions=[
                        "Assumption: 'If I don't give them this money, their life will fall apart and it's my fault.'",
                        "Assumption: 'Good children always share their entire income with their parents.'",
                        "Assumption: 'They will stop asking after just this one last time.'"
                    ],
                    current_dynamic="They manufacture financial urgency; you feel guilty and write checks. The cycle repeats indefinitely.",
                    power_leak="Disclosing your exact salary, bonus, savings account balance, or stock grants.",
                    frame_reclaim="Total information diet regarding your finances. Transition from open-ended bailouts to a strictly budgeted, non-negotiable contribution.",
                    scenarios=[
                        ScenarioBranch(
                            scenario_id="receptive",
                            scenario_title="Scenario A: If They Respect the Fixed Contribution",
                            their_likely_reaction="They thank you for the fixed amount and adjust their household budget accordingly.",
                            the_trap="Feeling generous and slipping extra cash outside the agreed budget.",
                            your_countermove="Stick strictly to the scheduled monthly transfer. Consistency builds respect.",
                            exact_script="\"Glad we could align on this. The designated contribution has been transferred. Let's make sure expenses stay within this framework.\""
                        ),
                        ScenarioBranch(
                            scenario_id="defensive",
                            scenario_title="Scenario B: If They Claim You're Stingy & Try Guilt-Tripping",
                            their_likely_reaction="\"You make so much money in IT/corporate! Why are you being so stingy with your own blood?\"",
                            the_trap="Explaining your rent, taxes, and mutual funds to justify your savings.",
                            your_countermove="Never justify. State your fixed limit without financial disclosures.",
                            exact_script="\"My budget for family assistance is fixed at this amount. My personal financial commitments are fully allocated and not open for discussion.\""
                        ),
                        ScenarioBranch(
                            scenario_id="silent",
                            scenario_title="Scenario C: If They Fabricate an Immediate False Emergency",
                            their_likely_reaction="\"If you don't send 50,000 immediately, we will be ruined!\"",
                            the_trap="Panicking and sending money before verifying the reality of the crisis.",
                            your_countermove="Offer non-monetary assistance or pay the service provider directly (hospital, mechanic, school) rather than giving cash.",
                            exact_script="\"I cannot send cash. If there is a legitimate medical or institutional bill, send me the official invoice and I will verify what portion can be paid directly.\""
                        )
                    ],
                    counter_scripts=[
                        CounterScriptItem(
                            if_they_say="\"We took care of you for 20 years, now you're counting every rupee?\"",
                            tactic_used="Weaponizing child-rearing expenses as a commercial debt.",
                            your_counter="\"Raising a child is a parental responsibility, not a commercial loan with compound interest. I contribute what is healthy and sustainable for my future.\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"Your cousin sends 80% of his salary home, why can't you?\"",
                            tactic_used="Comparative shame to break your boundary.",
                            your_counter="\"My cousin's financial arrangements are between him and his family. My financial parameters are what we are discussing.\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"Just take a personal loan for us, you have good credit!\"",
                            tactic_used="Transferring long-term risk and liability onto your legal record.",
                            your_counter="\"I have an absolute rule never to take personal debt for third-party expenses. That is completely off the table.\""
                        )
                    ],
                    cost_of_inaction="Remaining broke in your 30s with zero retirement savings, high stress, and bitter resentment toward your relatives.",
                    payoff_of_boundary="Financial sovereignty, freedom to invest in your own family and assets, and a clean relationship free of monetary resentment.",
                    primary_script="\"I am able to contribute [Fixed Amount] monthly to support household needs. Beyond that, my funds are fully allocated to long-term commitments and I cannot provide additional money.\"",
                    internal_shift="Real generosity comes from a full cup. You cannot save anyone from drowning by sinking your own boat."
                )
            ],

            # ---------------- 3. WORK & CAREER ----------------
            "career": [
                LogicalScenarioProtocol(
                    keywords=["boss", "manager", "toxic", "credit", "dump", "overtime", "weekend", "yell", "meeting", "workload"],
                    title="Conscientiousness Exploitation & Workplace Boundary Enforcement",
                    root_diagnosis="Your professional environment is engaging in conscientiousness exploitation. In modern corporate structures, high-performing and agreeable employees are routinely punished with higher workloads while aggressive peers take credit. Your compliance has been categorized as free labor.",
                    hard_truth="Loyalty to an employer is an uncompensated expense. If you work 65 hours a week without equity, bonuses, or title advancement, you are volunteering for a corporation that will replace you within 72 hours if your health collapses. Over-delivering in silence creates zero leverage.",
                    verified_facts=[
                        "Your workload has expanded without corresponding compensation or title adjustments.",
                        "Boundaries around evenings, weekends, or PTO are routinely violated.",
                        "Management takes your availability for granted because you never push back."
                    ],
                    emotional_assumptions=[
                        "Assumption: 'If I just grind a little harder, my manager will finally reward me.'",
                        "Assumption: 'If I push back on this weekend task, I will be immediately fired.'",
                        "Assumption: 'Saying no makes me look like an uncommitted employee.'"
                    ],
                    current_dynamic="Management treats project crises as your moral obligation; you absorb the stress and work unpaid overtime.",
                    power_leak="Instantly answering Slack messages after 8 PM, apologizing for taking approved vacation, and saying yes verbally without written scope limits.",
                    frame_reclaim="Implement rigorous asynchronous documentation. Shift from being an agreeable helper to a contractual professional who trades specific hours for specific value.",
                    scenarios=[
                        ScenarioBranch(
                            scenario_id="receptive",
                            scenario_title="Scenario A: If Your Manager Is Reasonable & Receptive",
                            their_likely_reaction="\"I honestly didn't realize how overloaded you were. Let's see what we can take off your plate.\"",
                            the_trap="Minimizing your struggle: 'Oh it's okay, I was just a bit tired!' and taking the work back.",
                            your_countermove="Lock in the deprioritization in writing immediately.",
                            exact_script="\"Thank you for understanding. To ensure quality, let's officially push Project B to next sprint so I can deliver Project A with high excellence.\""
                        ),
                        ScenarioBranch(
                            scenario_id="defensive",
                            scenario_title="Scenario B: If Your Manager Pushes Back or Uses Guilt",
                            their_likely_reaction="\"We're a team! We all make sacrifices here. I thought you were aiming for leadership?\"",
                            the_trap="Feeling ashamed and agreeing to work through Sunday night.",
                            your_countermove="Use Trade-off Framing. Make them choose the tradeoff rather than saying a flat no.",
                            exact_script="\"I am fully committed to our team's success. Given finite hours, taking on Task X means Deliverable Y will be delayed. Which of these two is the business priority?\""
                        ),
                        ScenarioBranch(
                            scenario_id="silent",
                            scenario_title="Scenario C: If You Face Retaliation or Toxic Micromanagement",
                            their_likely_reaction="Assigning you menial tasks, giving aggressive feedback in 1-on-1s, or questioning your commitment.",
                            the_trap="Panicking and burning out to win back their impossible approval.",
                            your_countermove="Quiet Detachment & Active Job Hunting. Work strictly to contract hours and send 5 applications weekly.",
                            exact_script="\"Understood. I will document this feedback and focus on meeting the documented KPIs for my role.\""
                        )
                    ],
                    counter_scripts=[
                        CounterScriptItem(
                            if_they_say="\"Can you just knock this out quickly tonight? It won't take long.\"",
                            tactic_used="Downplaying the scope to violate your evening boundary.",
                            your_counter="\"I have hard personal commitments tonight. I will review this first thing at 9:00 AM tomorrow and provide an update.\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"Everyone else is working this weekend, why can't you?\"",
                            tactic_used="Peer pressure to normalize uncompensated labor.",
                            your_counter="\"My work schedule during business hours is structured to hit all core deliverables. I am offline on weekends to ensure focus during the week.\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"You're not being a team player.\"",
                            tactic_used="Moral shaming to force boundary surrender.",
                            your_counter="\"Being a team player means managing capacity responsibly so high-stakes work doesn't suffer from burnout. Let's prioritize the backlog together.\""
                        )
                    ],
                    cost_of_inaction="Severe adrenal fatigue, medical burnout, damaged personal relationships, and zero career leverage in 12 months.",
                    payoff_of_boundary="Recovered sanity, protected evenings, professional respect from peers, and the mental bandwidth to land a 30% higher-paying role.",
                    primary_script="\"I want to make sure our highest-impact deliverables get the focus they deserve. Given my current bandwidth on [Priority A], taking on [New Task] will push delivery timelines. Which of these should take precedence?\"",
                    internal_shift="A job is a business transaction. Never sacrifice your health for an institution that will replace you by Monday."
                ),
                LogicalScenarioProtocol(
                    keywords=["raise", "salary", "underpaid", "promotion", "stuck", "money", "worth", "negotiate"],
                    title="The Strategic Compensation Review & Leverage Protocol",
                    root_diagnosis="You are suffering from the 'Meritocracy Fallacy'—believing that good work speaks for itself and leadership will voluntarily reward you. In corporate economics, salary increases are an expense; management has zero financial incentive to pay you more until you make staying at below-market rates a retention risk.",
                    hard_truth="If you have exceeded metrics for over a year and haven't demanded a compensation review, your loyalty is actively costing you money. Waiting for someone to tap you on the shoulder for a raise is professional passivity.",
                    verified_facts=[
                        "Your scope has broadened significantly since your compensation was last adjusted.",
                        "Comparable market compensation for your role is higher than your current pay.",
                        "You have quantifiable impact data (revenue, cost reduction, client wins)."
                    ],
                    emotional_assumptions=[
                        "Assumption: 'If I ask for more money, they will think I am greedy or disloyal.'",
                        "Assumption: 'The company says budgets are tight, so I should wait for next year.'",
                        "Assumption: 'My boss knows I deserve it and will handle it when the time is right.'"
                    ],
                    current_dynamic="You perform at Senior level while being compensated at Junior/Mid level. The company is extracting surplus value.",
                    power_leak="Waiting until annual review cycles and accepting vague promises like 'we'll look into it next quarter.'",
                    frame_reclaim="Build an incontrovertible Business Impact Dossier. Frame the raise as an investment in a high-return asset.",
                    scenarios=[
                        ScenarioBranch(
                            scenario_id="receptive",
                            scenario_title="Scenario A: If They Agree and Approve the Adjustment",
                            their_likely_reaction="\"You've done fantastic work. Let's submit the paperwork for the next cycle.\"",
                            the_trap="Assuming a verbal promise is a done deal and relaxing.",
                            your_countermove="Lock down exact dates and written confirmation.",
                            exact_script="\"Thank you for recognizing my impact. Could you confirm what date this adjustment takes effect and when I will see it reflected in payroll?\""
                        ),
                        ScenarioBranch(
                            scenario_id="defensive",
                            scenario_title="Scenario B: If They Claim 'Budget Freezes' but Praise Your Work",
                            their_likely_reaction="\"You're one of our top people, but leadership has frozen all salary adjustments right now.\"",
                            the_trap="Accepting the freeze and waiting another 12 months in silence.",
                            your_countermove="Negotiate non-monetary leverage immediately: remote days, title upgrade, or guaranteed review in 90 days.",
                            exact_script="\"I understand budget constraints. If base salary cannot move today, let's update my title to reflect my scope and put a binding compensation review on the calendar for 90 days.\""
                        ),
                        ScenarioBranch(
                            scenario_id="silent",
                            scenario_title="Scenario C: If They Flatly Reject or Minimize Your Contributions",
                            their_likely_reaction="\"You should just be grateful to have a job in this market. Your work is just baseline.\"",
                            the_trap="Arguing emotionally or losing motivation while staying at the desk.",
                            your_countermove="Smile, nod, and begin intense external interviewing immediately. Your market value is proven externally.",
                            exact_script="\"Understood. Thank you for the clarity on where the company stands regarding my role.\""
                        )
                    ],
                    counter_scripts=[
                        CounterScriptItem(
                            if_they_say="\"We just don't have the budget right now.\"",
                            tactic_used="The standard corporate deflection shield.",
                            your_counter="\"I understand standard departmental budgets are constrained. What out-of-cycle retention pools or title realignments can we utilize for this?\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"It wouldn't be fair to others on the team if we gave you a raise.\"",
                            tactic_used="Social equity shaming to suppress individual negotiation.",
                            your_counter="\"My compensation reflects my individual impact and market benchmark, not team averages. Let's focus on the value I am generating.\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"Keep doing what you're doing, and it'll happen in the future.\"",
                            tactic_used="Kicking the can down the road with zero contractual accountability.",
                            your_counter="\"Let's establish the exact KPIs required so we can put a concrete review date on the calendar. What specific milestone needs to be hit?\""
                        )
                    ],
                    cost_of_inaction="Losing $15,000 to $40,000 every single year in compounding wage stagnation and reduced retirement contributions.",
                    payoff_of_boundary="Immediate income boost, professional validation, and the confidence of knowing you control your financial trajectory.",
                    primary_script="\"Over the past 12 months, my scope has expanded to lead [Key Deliverables], which generated [Specific Business Metric]. Based on this impact and current market benchmarks, I am requesting an adjustment of my compensation to [Target Number]. Let's discuss how we can align on this.\"",
                    internal_shift="You do not get what you deserve in the market; you get what you have the evidence and courage to negotiate."
                )
            ],

            # ---------------- 4. FRIENDSHIP & SOCIAL ----------------
            "social": [
                LogicalScenarioProtocol(
                    keywords=["friend", "one-sided", "call", "only when", "favor", "left out", "group", "gossip", "ghosted by friend"],
                    title="The Unilateral Investment Dynamic & Friendship Audit",
                    root_diagnosis="You are maintaining a friendship on emotional life support through unilateral effort. When you stop reaching out, the dynamic goes completely silent. You are confusing length of acquaintance (sunk cost fallacy) with depth of genuine mutual loyalty.",
                    hard_truth="Not everyone who shared your past is qualified for your future. If someone only contacts you when they are bored, heartbroken, or need a favor, you are not their close friend—you are an unpaid emotional utility. Matching someone's energy is not petty; it is self-respect.",
                    verified_facts=[
                        "They rarely or never initiate check-ins without an underlying favor or venting session.",
                        "When you share your struggles, they quickly pivot the conversation back to themselves.",
                        "You feel depleted, resentful, or anxious after interacting with them."
                    ],
                    emotional_assumptions=[
                        "Assumption: 'We've been friends for 8 years, I can't just let that go.'",
                        "Assumption: 'They are just really busy; they still care deep down.'",
                        "Assumption: 'If I speak up, our mutual friend group will turn against me.'"
                    ],
                    current_dynamic="You provide emotional labor and listening ears; they consume it and vanish until their next crisis.",
                    power_leak="Instantly saying yes to last-minute invitations and dropping your plans whenever they call with drama.",
                    frame_reclaim="The Effort Matching Protocol. Stop initiating, stop over-functioning, and observe what happens with calm detachment.",
                    scenarios=[
                        ScenarioBranch(
                            scenario_id="receptive",
                            scenario_title="Scenario A: If They Notice Your Absence & Genuinely Check In",
                            their_likely_reaction="\"Hey, I realized you've been quiet lately. Is everything okay? I feel like I haven't been there for you.\"",
                            the_trap="Saying 'Oh no everything is fine!' and reverting to the old pattern.",
                            your_countermove="Be vulnerably honest without anger.",
                            exact_script="\"Thanks for noticing. Honestly, I've felt our dynamic has been pretty one-sided lately, and I was feeling drained. I value our friendship and wanted to share that honestly.\""
                        ),
                        ScenarioBranch(
                            scenario_id="defensive",
                            scenario_title="Scenario B: If They Only Reach Out to Demand a Favor",
                            their_likely_reaction="\"Heyyy! Can you do me a quick favor / drive me somewhere / lend me something?\"",
                            the_trap="Feeling bad and agreeing, which reinforces their belief that you are an on-demand utility.",
                            your_countermove="Polite, friction-free refusal with zero over-explaining.",
                            exact_script="\"Hey! I'm completely booked with my own schedule this week and won't be able to help out. Hope you get it sorted!\""
                        ),
                        ScenarioBranch(
                            scenario_id="silent",
                            scenario_title="Scenario C: If Months Go By in Complete Silence",
                            their_likely_reaction="They simply never reach out again unless they see you in person.",
                            the_trap="Feeling bitter and writing an angry confrontation text.",
                            your_countermove="Accept the natural death of the connection with grace. No drama needed.",
                            exact_script="[NO ACTION NEEDED]. Bless them and let them go. Invest that energy in reciprocating friends."
                        )
                    ],
                    counter_scripts=[
                        CounterScriptItem(
                            if_they_say="\"You never call or make plans anymore!\"",
                            tactic_used="Guilt-tripping you for stopping the unilateral effort.",
                            your_counter="\"A phone works both ways. When I noticed I was the only one reaching out, I decided to give you space.\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"Why are you being so distant and weird lately?\"",
                            tactic_used="Framing your healthy detachment as abnormal behavior.",
                            your_counter="\"I'm not being weird; I'm prioritizing my own energy and commitments right now.\""
                        ),
                        CounterScriptItem(
                            if_they_say="\"After all the history we have, you're acting like this?\"",
                            tactic_used="Invoking history to bypass present-day neglect.",
                            your_counter="\"I appreciate our history, but a healthy friendship requires present effort, not just past memories.\""
                        )
                    ],
                    cost_of_inaction="Remaining surrounded by people who drain your vitality, while blocking real friends who would show up for you.",
                    payoff_of_boundary="Emotional lightness, zero resentment, and a curated social circle of high-character, reciprocal relationships.",
                    primary_script="\"I've been reflecting on our friendship, and I've felt a lack of mutual effort recently. I care about you, but I need to focus my energy on connections that feel reciprocal for both of us.\"",
                    internal_shift="Stop swimming across oceans for people who wouldn't jump across a puddle for you."
                )
            ]
        }

    def fallback_protocol(self, category: str, situation: str) -> MentorAdviceResponse:
        cat_key = category.lower() if category.lower() in self.protocols else "dating"
        label = self.CATEGORY_LABELS.get(cat_key, "Life & Mindset")

        return MentorAdviceResponse(
            category=cat_key,
            category_label=label,
            title=f"Multi-Perspective Tactical Decision Tree ({label})",
            root_diagnosis="You are caught between emotional attachment and logical boundaries. When a dilemma persists unresolved, it is almost always because you are avoiding the short-term emotional pain of enforcing a non-negotiable boundary.",
            hard_truth="Waiting for the 'perfect, comfortable moment' to resolve this is a cognitive illusion. The comfortable moment will never arrive. Discomfort is the currency of adult freedom.",
            facts_vs_assumptions=FactsVsAssumptions(
                verified_facts=[
                    "The current dynamic is causing you chronic mental exhaustion and rumination.",
                    "Your previous attempts to fix it through polite hints have yielded zero sustained change.",
                    "You are tolerating behavior that violates your internal standards."
                ],
                emotional_assumptions=[
                    "Assumption: 'If I enforce a hard boundary, everything will permanently collapse.'",
                    "Assumption: 'Maybe I'm asking for too much.'",
                    "Assumption: 'If I just endure it a little longer, it will resolve on its own.'"
                ]
            ),
            leverage_audit=LeverageAudit(
                current_dynamic="You have surrendered leverage by communicating that your boundaries are flexible and open for endless negotiation.",
                power_leak="Over-explaining yourself, apologizing before stating your needs, and failing to execute consequences when lines are crossed.",
                frame_reclaim="State your boundary in one clear sentence. Enforce it with calm action rather than emotional debate."
            ),
            scenarios=[
                ScenarioBranch(
                    scenario_id="receptive",
                    scenario_title="Scenario A: If They Cooperate & Respect the Boundary",
                    their_likely_reaction="They express willingness to adjust and acknowledge your perspective.",
                    the_trap="Backtracking on your boundary out of relief and letting standards slide.",
                    your_countermove="Acknowledge the cooperation and hold the line consistently over the next 30 days.",
                    exact_script="\"Thank you for hearing me on this. It means a lot, and I appreciate us working through this like mature adults.\""
                ),
                ScenarioBranch(
                    scenario_id="defensive",
                    scenario_title="Scenario B: If They Push Back, Deflect, or Blame You",
                    their_likely_reaction="They raise their voice, bring up irrelevant past grievances, or play the victim.",
                    the_trap="Getting dragged into the weeds of debating the past instead of holding your current boundary.",
                    your_countermove="Do not defend. Re-anchor to your single core requirement.",
                    exact_script="\"I am not here to debate past history. I am telling you what I need moving forward. If you cannot meet that, I will be taking space.\""
                ),
                ScenarioBranch(
                    scenario_id="silent",
                    scenario_title="Scenario C: If They Disengage, Stonewall, or Ghost",
                    their_likely_reaction="They withdraw communication to punish you into apologizing.",
                    the_trap="Panic-texting or calling repeatedly to break the uncomfortable silence.",
                    your_countermove="Hold the silence. Do not chase. Let the silence reveal their true character.",
                    exact_script="\"I see you need space. When you are ready to communicate with maturity and clarity, let me know. Until then, I am stepping back.\""
                )
            ],
            counter_scripts=[
                CounterScriptItem(
                    if_they_say="\"You are blowing this way out of proportion!\"",
                    tactic_used="Minimizing your reality to avoid accountability.",
                    your_counter="\"How I experience this situation is not up for your approval. This matters to me, and it needs to be addressed.\""
                ),
                CounterScriptItem(
                    if_they_say="\"If you really cared about me/this family/this job, you wouldn't act like this.\"",
                    tactic_used="Emotional loyalty shaming.",
                    your_counter="\"Caring about someone does not require sacrificing my self-respect. True loyalty respects mutual boundaries.\""
                ),
                CounterScriptItem(
                    if_they_say="\"Fine, do whatever you want! (Aggressive capitulation)\"",
                    tactic_used="Sarcastic surrender designed to make you feel guilty.",
                    your_counter="\"I'm glad we are in agreement on my boundary. I expect this to be respected moving forward.\""
                )
            ],
            cost_of_inaction="In 6 months, you will have reinforced to everyone around you that your boundaries are meaningless, leading to deeper exploitation and anxiety.",
            payoff_of_boundary="Immediate recovery of your self-respect, elimination of chronic overthinking, and a life organized around mutual dignity.",
            primary_script="\"I need to be direct with you about how this situation impacts me. Moving forward, my boundary is [Specific Requirement]. If that cannot be respected, I will need to step away from this dynamic.\"",
            internal_shift="Self-respect will cost you connections with people who benefited from your lack of boundaries. Pay the price gladly."
        )

    def analyze(self, category: str, situation: str) -> MentorAdviceResponse:
        cat_key = category.lower() if category.lower() in self.protocols else "dating"
        protocols_list = self.protocols[cat_key]

        best_protocol: Optional[LogicalScenarioProtocol] = None
        highest_score = 0

        for proto in protocols_list:
            score = proto.match_score(situation)
            if score > highest_score:
                highest_score = score
                best_protocol = proto

        if not best_protocol or highest_score < 15:
            return self.fallback_protocol(cat_key, situation)

        return MentorAdviceResponse(
            category=cat_key,
            category_label=self.CATEGORY_LABELS[cat_key],
            title=best_protocol.title,
            root_diagnosis=best_protocol.root_diagnosis,
            hard_truth=best_protocol.hard_truth,
            facts_vs_assumptions=FactsVsAssumptions(
                verified_facts=best_protocol.verified_facts,
                emotional_assumptions=best_protocol.emotional_assumptions
            ),
            leverage_audit=LeverageAudit(
                current_dynamic=best_protocol.current_dynamic,
                power_leak=best_protocol.power_leak,
                frame_reclaim=best_protocol.frame_reclaim
            ),
            scenarios=best_protocol.scenarios,
            counter_scripts=best_protocol.counter_scripts,
            long_term_projection=LongTermProjection(
                cost_of_inaction_6_months=best_protocol.cost_of_inaction,
                payoff_of_boundary=best_protocol.payoff_of_boundary
            ),
            primary_script=best_protocol.primary_script,
            internal_shift=best_protocol.internal_shift
        )
