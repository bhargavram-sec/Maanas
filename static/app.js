/* ========================================================
   MANAS — Real-Life Mentor Application Logic
   ======================================================== */

(function () {
  'use strict';

  // --- Category Presets & Placeholders ---
  const CATEGORY_DATA = {
    dating: {
      label: "Dating & Relationships",
      placeholder: "Describe what happened: What did your partner/date do? (e.g., left on delivered for hours, broke trust, mixed signals) How did you react, and what are you debating doing next?",
      presets: [
        { label: "📱 Late replies & mixed signals", text: "He leaves me on delivered for 8+ hours and replies with dry one-word answers. It makes me anxious and I keep checking my phone. Should I double text or say something?" },
        { label: "💔 Urge to text my ex", text: "I've been in no-contact with my ex for 2 weeks, but today I miss them intensely and want to send a casual 'I hope you're okay' message. Should I reach out?" },
        { label: "🔍 Secrecy & broken trust", text: "I noticed my partner being strangely protective of their phone and hiding chats. When I asked calmly, they accused me of being crazy and invading their privacy." }
      ]
    },
    family: {
      label: "Family Expectations",
      placeholder: "Describe the family dilemma: What are your parents or relatives demanding? How are they guilt-tripping you, and what boundary are you struggling to enforce?",
      presets: [
        { label: "💍 Forced marriage / career pressure", text: "My parents are emotional blackmailing me, saying 'we sacrificed our whole lives for you' because I don't want the arranged marriage/career path they chose." },
        { label: "💸 Family financial entitlement", text: "My family treats my salary like communal property and demands I cover debts or expenses, but when I hesitate, they call me selfish and ungrateful." }
      ]
    },
    career: {
      label: "Work & Career",
      placeholder: "Describe your workplace situation: What is your manager or colleague doing? Are you dealing with burnout, unfair workload, credit stealing, or asking for compensation?",
      presets: [
        { label: "💼 Toxic manager & credit stealing", text: "My manager dumps extra weekend work on me, ignores my boundaries, and then takes full credit for my deliverables in leadership meetings." },
        { label: "📈 Underpaid & asking for a raise", text: "I've exceeded all my targets for the past 14 months and took on extra scope, but my company hasn't adjusted my salary. How do I ask for a raise without getting rejected?" }
      ]
    },
    social: {
      label: "Friendship & Social",
      placeholder: "Describe the friendship issue: Is it a one-sided connection, drama in a friend circle, or feeling drained by someone who only reaches out for favors?",
      presets: [
        { label: "🤝 One-sided friendship", text: "I have a friend who only reaches out when they need emotional dumping or a favor. If I don't message first, weeks go by in complete silence." },
        { label: "🚶 Outgrowing old friends", text: "I feel like I've outgrown my childhood friend group. Our conversations feel shallow and draining, but I feel immense guilt about distancing myself." }
      ]
    }
  };

  let activeCategory = 'dating';
  let isDarkMode = false;
  let currentAdviceData = null;

  // --- DOM Elements ---
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const domainCards = document.querySelectorAll('.domain-card');
  const navItems = document.querySelectorAll('.nav-item');
  const tabPanes = document.querySelectorAll('.tab-pane');

  const currentDomainLabel = document.getElementById('current-domain-label');
  const presetsContainer = document.getElementById('presets-container');
  const situationInput = document.getElementById('situation-input');
  const goalSelect = document.getElementById('goal-select');
  const dilemmaForm = document.getElementById('dilemma-form');
  const breakdownBtn = document.getElementById('breakdown-btn');
  const spinner = breakdownBtn ? breakdownBtn.querySelector('.spinner') : null;
  const btnText = breakdownBtn ? breakdownBtn.querySelector('.btn-text') : null;

  const adviceDossier = document.getElementById('advice-dossier');
  const dossierCatBadge = document.getElementById('dossier-cat-badge');
  const dossierTitle = document.getElementById('dossier-title');
  const resFactsList = document.getElementById('res-facts-list');
  const resAssumptionsList = document.getElementById('res-assumptions-list');
  const resRoot = document.getElementById('res-root');
  const resTruth = document.getElementById('res-truth');
  const resLeverageDynamic = document.getElementById('res-leverage-dynamic');
  const resLeverageLeak = document.getElementById('res-leverage-leak');
  const resLeverageReclaim = document.getElementById('res-leverage-reclaim');
  const resPrimaryScript = document.getElementById('res-primary-script');
  const copyPrimaryScriptBtn = document.getElementById('copy-primary-script-btn');
  const copyPrimaryText = document.getElementById('copy-primary-text');
  const scenarioTabsNav = document.getElementById('scenario-tabs-nav');
  const scenarioActiveCard = document.getElementById('scenario-active-card');
  const counterScriptsContainer = document.getElementById('counter-scripts-container');
  const resCost6m = document.getElementById('res-cost-6m');
  const resPayoffBoundary = document.getElementById('res-payoff-boundary');
  const resShift = document.getElementById('res-shift');
  const savePlaybookBtn = document.getElementById('save-playbook-btn');

  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatStream = document.getElementById('chat-stream');
  const clearChatBtn = document.getElementById('clear-chat-btn');

  const savedList = document.getElementById('saved-list');
  const clearSavedBtn = document.getElementById('clear-saved-btn');

  // --- Category Switching ---
  function setCategory(catKey) {
    if (!CATEGORY_DATA[catKey]) return;
    activeCategory = catKey;
    body.setAttribute('data-category', catKey);

    domainCards.forEach(card => {
      card.classList.toggle('active', card.dataset.category === catKey);
    });

    const data = CATEGORY_DATA[catKey];
    if (currentDomainLabel) currentDomainLabel.textContent = data.label;
    if (situationInput) situationInput.placeholder = data.placeholder;

    renderPresets(data.presets);
  }

  function renderPresets(presets) {
    if (!presetsContainer) return;
    presetsContainer.innerHTML = '';

    presets.forEach(preset => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'preset-chip';
      chip.textContent = preset.label;
      chip.addEventListener('click', () => {
        if (situationInput) {
          situationInput.value = preset.text;
          situationInput.focus();
        }
      });
      presetsContainer.appendChild(chip);
    });
  }

  domainCards.forEach(card => {
    card.addEventListener('click', () => {
      setCategory(card.dataset.category);
    });
  });

  // --- Tab Navigation ---
  navItems.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;

      navItems.forEach(t => t.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(`tab-${targetId}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // --- Theme Toggle ---
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      isDarkMode = !isDarkMode;
      body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    });
  }

  // --- Dilemma Form Submission ---
  if (dilemmaForm) {
    dilemmaForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const situation = situationInput.value.trim();
      if (!situation) return;

      const goal = goalSelect ? goalSelect.value : 'clarity';

      if (spinner) spinner.style.display = 'inline-block';
      if (btnText) btnText.textContent = 'Dissecting Situation...';
      if (breakdownBtn) breakdownBtn.disabled = true;

      try {
        const response = await fetch('/api/mentor/advice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: activeCategory, situation, goal })
        });

        if (!response.ok) throw new Error('Failed to generate breakdown');

        const data = await response.json();
        currentAdviceData = data;
        renderDossier(data);
      } catch (err) {
        console.error(err);
        alert('Could not generate breakdown right now. Please check your connection.');
      } finally {
        if (spinner) spinner.style.display = 'none';
        if (btnText) btnText.textContent = 'Get Tactical Breakdown';
        if (breakdownBtn) breakdownBtn.disabled = false;
      }
    });
  }

  function renderDossier(data) {
    if (!adviceDossier) return;

    // Header info
    if (dossierCatBadge) dossierCatBadge.textContent = data.category_label || activeCategory.toUpperCase();
    if (dossierTitle) dossierTitle.textContent = data.title;

    // Perspective 1: Facts vs Emotional Assumptions
    if (resFactsList) {
      resFactsList.innerHTML = '';
      const facts = (data.facts_vs_assumptions && data.facts_vs_assumptions.verified_facts) || [];
      facts.forEach(fact => {
        const li = document.createElement('li');
        li.textContent = fact;
        resFactsList.appendChild(li);
      });
    }

    if (resAssumptionsList) {
      resAssumptionsList.innerHTML = '';
      const assumptions = (data.facts_vs_assumptions && data.facts_vs_assumptions.emotional_assumptions) || [];
      assumptions.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        resAssumptionsList.appendChild(li);
      });
    }

    // Perspective 2: Root & Hard Truth
    if (resRoot) resRoot.textContent = data.root_diagnosis || '';
    if (resTruth) resTruth.textContent = `\u201C${data.hard_truth || ''}\u201D`;

    // Perspective 3: Leverage & Power Dynamic
    if (data.leverage_audit) {
      if (resLeverageDynamic) resLeverageDynamic.textContent = data.leverage_audit.current_dynamic || '';
      if (resLeverageLeak) resLeverageLeak.textContent = data.leverage_audit.power_leak || '';
      if (resLeverageReclaim) resLeverageReclaim.textContent = data.leverage_audit.frame_reclaim || '';
    }

    // Perspective 4: Primary Script
    if (resPrimaryScript) resPrimaryScript.textContent = data.primary_script || '';

    // Perspective 5: Conditional Scenario Matrix (Interactive Tabs)
    renderScenarios(data.scenarios || []);

    // Perspective 6: Conversational Counter-Scripts Matrix
    renderCounterScripts(data.counter_scripts || []);

    // Perspective 7: Long-Term Risk vs Reward
    if (data.long_term_projection) {
      if (resCost6m) resCost6m.textContent = data.long_term_projection.cost_of_inaction_6_months || '';
      if (resPayoffBoundary) resPayoffBoundary.textContent = data.long_term_projection.payoff_of_boundary || '';
    }

    // Internal Shift
    if (resShift) resShift.textContent = data.internal_shift || '';

    adviceDossier.style.display = 'block';
    adviceDossier.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // --- Scenario Matrix Switcher ---
  function renderScenarios(scenarios) {
    if (!scenarioTabsNav || !scenarioActiveCard) return;
    scenarioTabsNav.innerHTML = '';

    if (!scenarios || scenarios.length === 0) {
      scenarioActiveCard.innerHTML = '<p class="section-subtext">No conditional branches available.</p>';
      return;
    }

    let activeIndex = 0;

    scenarios.forEach((sc, idx) => {
      const tabBtn = document.createElement('button');
      tabBtn.type = 'button';
      tabBtn.className = `scenario-tab-btn ${idx === activeIndex ? 'active' : ''}`;
      tabBtn.textContent = sc.scenario_title;
      tabBtn.addEventListener('click', () => {
        activeIndex = idx;
        const allBtns = scenarioTabsNav.querySelectorAll('.scenario-tab-btn');
        allBtns.forEach((b, i) => b.classList.toggle('active', i === activeIndex));
        displayActiveScenario(scenarios[activeIndex]);
      });
      scenarioTabsNav.appendChild(tabBtn);
    });

    displayActiveScenario(scenarios[0]);
  }

  function displayActiveScenario(sc) {
    if (!scenarioActiveCard || !sc) return;

    scenarioActiveCard.innerHTML = `
      <div class="scenario-field">
        <div class="scenario-field-label">
          <span>🗨️</span> Their Likely Response:
        </div>
        <p class="scenario-reaction-quote">${escapeHtml(sc.their_likely_reaction)}</p>
      </div>

      <div class="scenario-field">
        <div class="scenario-field-label">
          <span>⚠️</span> The Psychological Trap:
        </div>
        <div class="trap-warning-box">
          ${escapeHtml(sc.the_trap)}
        </div>
      </div>

      <div class="scenario-field">
        <div class="scenario-field-label">
          <span>⚡</span> Your Tactical Countermove:
        </div>
        <div class="countermove-box">
          ${escapeHtml(sc.your_countermove)}
        </div>
      </div>

      <div class="scenario-field">
        <div class="contingency-script-box">
          <div class="contingency-script-header">
            <span class="script-role-badge">Contingency Script</span>
            <button type="button" class="copy-btn copy-contingency-btn">
              <span>📋 Copy Script</span>
            </button>
          </div>
          <p class="contingency-script-text">${escapeHtml(sc.exact_script)}</p>
        </div>
      </div>
    `;

    const copyBtn = scenarioActiveCard.querySelector('.copy-contingency-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(sc.exact_script).then(() => {
          copyBtn.innerHTML = '<span>✔ Copied!</span>';
          copyBtn.style.background = '#059669';
          copyBtn.style.color = '#ffffff';
          setTimeout(() => {
            copyBtn.innerHTML = '<span>📋 Copy Script</span>';
            copyBtn.style.background = '';
            copyBtn.style.color = '';
          }, 2000);
        }).catch(() => {
          alert('Failed to copy. Please copy manually.');
        });
      });
    }
  }

  // --- Conversational Counter-Scripts Matrix ---
  function renderCounterScripts(counterItems) {
    if (!counterScriptsContainer) return;
    counterScriptsContainer.innerHTML = '';

    if (!counterItems || counterItems.length === 0) {
      counterScriptsContainer.innerHTML = '<p class="section-subtext">No counter scripts available.</p>';
      return;
    }

    counterItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'counter-card';
      card.innerHTML = `
        <div class="counter-they-say"><strong>If they say:</strong> ${escapeHtml(item.if_they_say)}</div>
        <div class="counter-tactic"><strong>Underlying Tactic:</strong> ${escapeHtml(item.tactic_used)}</div>
        <div class="counter-reply-box">
          <strong>Your Exact Counter:</strong>
          <span>${escapeHtml(item.your_counter)}</span>
        </div>
      `;
      counterScriptsContainer.appendChild(card);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- Copy Primary Script Button ---
  if (copyPrimaryScriptBtn) {
    copyPrimaryScriptBtn.addEventListener('click', () => {
      if (!resPrimaryScript || !resPrimaryScript.textContent) return;

      navigator.clipboard.writeText(resPrimaryScript.textContent).then(() => {
        if (copyPrimaryText) copyPrimaryText.innerHTML = '&#10004; Copied to Clipboard!';
        copyPrimaryScriptBtn.style.background = '#059669';
        copyPrimaryScriptBtn.style.color = '#ffffff';

        setTimeout(() => {
          if (copyPrimaryText) copyPrimaryText.innerHTML = '&#128203; Copy Script';
          copyPrimaryScriptBtn.style.background = '';
          copyPrimaryScriptBtn.style.color = '';
        }, 2200);
      }).catch(() => {
        alert('Failed to copy to clipboard. Please copy manually.');
      });
    });
  }

  // --- Saved Playbooks (LocalStorage) ---
  function getSavedPlaybooks() {
    try {
      return JSON.parse(localStorage.getItem('manas_saved_playbooks') || '[]');
    } catch {
      return [];
    }
  }

  function savePlaybookList(items) {
    localStorage.setItem('manas_saved_playbooks', JSON.stringify(items));
    renderSaved();
  }

  if (savePlaybookBtn) {
    savePlaybookBtn.addEventListener('click', () => {
      if (!currentAdviceData) return;

      const items = getSavedPlaybooks();
      items.unshift({
        id: Date.now(),
        category: currentAdviceData.category_label,
        title: currentAdviceData.title,
        hard_truth: currentAdviceData.hard_truth,
        primary_script: currentAdviceData.primary_script,
        reclaim_move: currentAdviceData.leverage_audit ? currentAdviceData.leverage_audit.frame_reclaim : '',
        date: new Date().toLocaleDateString(undefined, {
          month: 'short', day: 'numeric', year: 'numeric'
        })
      });

      savePlaybookList(items);
      alert('Playbook saved! You can review it anytime in the Saved Playbooks tab.');
    });
  }

  function renderSaved() {
    if (!savedList) return;
    const items = getSavedPlaybooks();

    if (items.length === 0) {
      savedList.innerHTML = `<p class="empty-state">No playbooks saved yet. Generate an advice breakdown on the Dilemma tab and click &ldquo;Save Playbook&rdquo;.</p>`;
      return;
    }

    savedList.innerHTML = items.map(p => `
      <article class="saved-item-card">
        <header class="saved-top">
          <span class="badge-category">${escapeHtml(p.category || '')}</span>
          <span>Saved: ${escapeHtml(p.date || '')}</span>
        </header>
        <h4 class="saved-title">${escapeHtml(p.title || '')}</h4>
        <p class="saved-quote">&ldquo;${escapeHtml(p.hard_truth || '')}&rdquo;</p>
        ${p.reclaim_move ? `<div style="font-size:0.85rem; color:#059669; font-weight:600; margin-bottom:10px;">⚡ Reclaim: ${escapeHtml(p.reclaim_move)}</div>` : ''}
        <div class="script-quote-wrap">
          <p class="script-content">${escapeHtml(p.primary_script || '')}</p>
        </div>
      </article>
    `).join('');
  }

  if (clearSavedBtn) {
    clearSavedBtn.addEventListener('click', () => {
      if (confirm('Delete all saved advice playbooks?')) {
        savePlaybookList([]);
      }
    });
  }

  // --- Live Mentor Chat (Multi-Turn Session Memory) ---
  let chatSessionId = sessionStorage.getItem('manas_chat_session_id');
  if (!chatSessionId) {
    chatSessionId = 'sess_' + Math.random().toString(36).substring(2, 11);
    sessionStorage.setItem('manas_chat_session_id', chatSessionId);
  }
  let chatHistory = [];

  if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;

      appendChatMessage('user', message);
      chatHistory.push({ role: 'user', content: message });
      chatInput.value = '';

      const typingBubble = appendTypingIndicator();

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            category: activeCategory,
            session_id: chatSessionId,
            history: chatHistory
          })
        });

        if (typingBubble && typingBubble.parentNode) {
          typingBubble.parentNode.removeChild(typingBubble);
        }

        if (!response.ok) throw new Error('Chat request failed');
        const data = await response.json();

        if (data.session_id) {
          chatSessionId = data.session_id;
          sessionStorage.setItem('manas_chat_session_id', chatSessionId);
        }

        appendChatMessage('mentor', data.reply, data.engine_used);
        chatHistory.push({ role: 'mentor', content: data.reply });
      } catch (err) {
        console.error(err);
        if (typingBubble && typingBubble.parentNode) {
          typingBubble.parentNode.removeChild(typingBubble);
        }
        appendChatMessage('mentor', "I hear you. Let's look at the facts directly: what is in your control right now, and what boundary do you need to hold?");
      }
    });
  }

  function appendTypingIndicator() {
    if (!chatStream) return null;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble mentor-bubble typing-bubble';

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.innerHTML = '&#9670;';

    const content = document.createElement('div');
    content.className = 'bubble-content';
    content.innerHTML = `
      <div class="typing-dots">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;

    bubble.appendChild(avatar);
    bubble.appendChild(content);

    chatStream.appendChild(bubble);
    chatStream.scrollTop = chatStream.scrollHeight;
    return bubble;
  }

  function appendChatMessage(sender, text, engineUsed) {
    if (!chatStream) return;

    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${sender}-bubble`;

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.innerHTML = sender === 'mentor' ? '&#9670;' : '&#9787;';

    const content = document.createElement('div');
    content.className = 'bubble-content';

    const p = document.createElement('p');
    p.textContent = text;
    content.appendChild(p);

    const timeRow = document.createElement('div');
    timeRow.className = 'msg-time';

    if (sender === 'mentor' && engineUsed) {
      const badge = document.createElement('span');
      badge.className = 'engine-pill';
      badge.textContent = engineUsed.replace('-flash', '').replace('-engine', '');
      timeRow.appendChild(badge);
    }

    const timeSpan = document.createElement('span');
    timeSpan.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    timeRow.appendChild(timeSpan);

    content.appendChild(timeRow);

    bubble.appendChild(avatar);
    bubble.appendChild(content);

    chatStream.appendChild(bubble);
    chatStream.scrollTop = chatStream.scrollHeight;
  }

  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      if (confirm('Clear chat conversation and reset session memory?')) {
        chatHistory = [];
        chatSessionId = 'sess_' + Math.random().toString(36).substring(2, 11);
        sessionStorage.setItem('manas_chat_session_id', chatSessionId);

        chatStream.innerHTML = `
          <div class="message-bubble mentor-bubble">
            <div class="avatar">&#9670;</div>
            <div class="bubble-content">
              <p>Chat cleared and session memory reset. I'm here. What situation do you need to dissect?</p>
              <div class="msg-time"><span>Just now</span></div>
            </div>
          </div>
        `;
      }
    });
  }

  // --- Initial Setup ---
  setCategory('dating');
  renderSaved();
})();
