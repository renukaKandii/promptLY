// sidepanel.js
(() => {
    const LOG = (...a) => console.log("[promptLY]", ...a);
    const ERR = (...a) => console.error("[promptLY]", ...a);
  
    // ----- Elements -----
    const els = {
      status: document.getElementById("promptly-status"),
      statusIndicator: document.getElementById("status-indicator"),
      hint: document.getElementById("runtime-hint"),
      mode: document.getElementById("mode"),
      tone: document.getElementById("tone"),
      lang: document.getElementById("lang"),
      input: document.getElementById("input"),
      customPrompt: document.getElementById("custom-prompt"),
      togglePrompt: document.getElementById("toggle-prompt"),
      out: document.getElementById("out"),
      run: document.getElementById("run"),
      copy: document.getElementById("copy"),
      historyList: document.getElementById("history-list"),
      clearHistory: document.getElementById("clear-history"),
    };
  
    // ----- Config -----
    const SUPPORTED = new Set(["en","es","ja"]);
    const DEFAULT_LANG = "en";
    const MAX_HISTORY = 10;
    const HISTORY_KEY = "promptly_history";
  
    // ----- History Management -----
    let history = [];
  
    async function loadHistory() {
      try {
        const result = await chrome.storage.local.get(HISTORY_KEY);
        history = result[HISTORY_KEY] || [];
        renderHistory();
      } catch (e) {
        ERR("Failed to load history:", e);
      }
    }
  
    async function saveHistory() {
      try {
        await chrome.storage.local.set({ [HISTORY_KEY]: history });
      } catch (e) {
        ERR("Failed to save history:", e);
      }
    }
  
    function addToHistory(item) {
      history.unshift(item);
      if (history.length > MAX_HISTORY) {
        history = history.slice(0, MAX_HISTORY);
      }
      saveHistory();
      renderHistory();
    }
  
    function formatTime(timestamp) {
      const now = new Date();
      const then = new Date(timestamp);
      const diffMs = now - then;
      const diffMins = Math.floor(diffMs / 60000);
      
      if (diffMins < 1) return "just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    }
  
    function renderHistory() {
      if (history.length === 0) {
        els.historyList.innerHTML = '<div class="history-empty">No history yet</div>';
        return;
      }
  
      els.historyList.innerHTML = history.map((item, index) => `
        <div class="history-item" data-index="${index}">
          <div class="history-item-header">
            <span class="history-item-mode">${item.mode}</span>
            <span class="history-item-time">${formatTime(item.timestamp)}</span>
          </div>
          <div class="history-item-text">${item.input.substring(0, 60)}${item.input.length > 60 ? '...' : ''}</div>
        </div>
      `).join('');
  
      // Add click handlers
      document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
          const index = parseInt(item.dataset.index);
          const historyItem = history[index];
          els.input.value = historyItem.input;
          els.mode.value = historyItem.mode;
          els.tone.value = historyItem.tone;
          els.lang.value = historyItem.language;
          if (historyItem.customPrompt) {
            els.customPrompt.value = historyItem.customPrompt;
            els.customPrompt.classList.add('visible');
            els.togglePrompt.textContent = '− Hide Custom Prompt';
          }
          els.out.textContent = historyItem.output;
        });
      });
    }
  
    // ----- Custom Prompt Toggle -----
    els.togglePrompt?.addEventListener('click', () => {
      const isVisible = els.customPrompt.classList.toggle('visible');
      els.togglePrompt.textContent = isVisible ? '− Hide Custom Prompt' : '+ Add Custom Prompt';
    });
  
    // ----- Clear History -----
    els.clearHistory?.addEventListener('click', async () => {
      if (confirm('Clear all history?')) {
        history = [];
        await saveHistory();
        renderHistory();
        setStatus("History cleared", "success");
      }
    });
  
    const setStatus = (m, type = "info") => {
      els.status.textContent = m;
      if (type === "success") {
        els.statusIndicator.style.background = "#10b981";
        els.statusIndicator.classList.remove("warning");
      } else if (type === "warning") {
        els.statusIndicator.style.background = "#f59e0b";
        els.statusIndicator.classList.add("warning");
      } else {
        els.statusIndicator.style.background = "#6366f1";
        els.statusIndicator.classList.remove("warning");
      }
    };
    
    const setHint = (m) => els.hint && (els.hint.textContent = m);
    const outText = (s) => els.out.textContent = s ?? "";
    const getLang = () => (SUPPORTED.has(els.lang.value) ? els.lang.value : DEFAULT_LANG);
    const getInput = () => (els.input.value || "").trim();
    const getCustomPrompt = () => (els.customPrompt.value || "").trim();
  
    // ----- Loading State -----
    let isProcessing = false;
    
    const setLoading = (loading) => {
      isProcessing = loading;
      els.run.disabled = loading;
      if (loading) {
        els.run.innerHTML = '<span class="loading"></span><span>Processing...</span>';
        setStatus("Generating...", "info");
      } else {
        els.run.innerHTML = '<span>⚡</span><span>Run</span>';
      }
    };
  
    // ---- Availability (supports both window.ai and LanguageModel) ----
    async function checkAvailability() {
      try {
        if (globalThis.window?.ai?.canCreateTextSession) {
          const s = await window.ai.canCreateTextSession();
          if (s === "readily") return "available";
          if (s === "after-download") return "downloading";
          return "no-runtime";
        }
        if (globalThis.LanguageModel?.availability) {
          return await globalThis.LanguageModel.availability();
        }
      } catch (e) { ERR("availability error", e); }
      return "no-runtime";
    }
  
    // ---- Build prompts ----
    function buildSystem(language, tone) {
      return `You are a writing assistant. Always respond strictly in language code "${language}". Keep tone ${tone}. ONLY output the revised text. Do NOT include explanations, bullet points, or notes about changes.`;
    }
    
    function buildUserPrompt(mode, language, tone, text, customPrompt) {
      let basePrompt;
      switch (mode) {
        case "summarize": 
          basePrompt = `Summarize in ${language} with a ${tone} tone. Output ONLY the summary:\n\n${text}`;
          break;
        case "translate": 
          basePrompt = `Translate into ${language} preserving meaning and style. Output ONLY the translation:\n\n${text}`;
          break;
        case "proofread": 
          basePrompt = `Proofread in ${language}; lightly edit for clarity; keep a ${tone} tone. Output ONLY the corrected text:\n\n${text}`;
          break;
        case "rewrite":
        default: 
          basePrompt = `Rewrite in ${language} with a ${tone} tone, improving clarity without changing meaning. Output ONLY the rewritten text:\n\n${text}`;
      }
      
      // Add custom prompt if provided
      if (customPrompt) {
        basePrompt = `${basePrompt}\n\nAdditional instructions: ${customPrompt}\n\nRemember: Output ONLY the final text, no explanations.`;
      }
      
      return basePrompt;
    }
  
    // ---- Generate via window.ai text session (primary) ----
    async function generateViaWindowAI({ language, tone, mode, text, customPrompt }) {
      if (!window.ai?.createTextSession) throw new Error("window.ai.createTextSession not available");
      
      // Create session with temperature for faster, more deterministic responses
      const session = await window.ai.createTextSession({
        systemPrompt: buildSystem(language, tone),
        temperature: 0.7, // Lower temperature for faster responses
        topK: 3 // Limit token sampling for speed
      });
      
      const prompt = buildUserPrompt(mode, language, tone, text, customPrompt);
      const result = await session.prompt(prompt);
      return typeof result === "string" ? result : JSON.stringify(result);
    }
  
    // ---- Fallback: try a LanguageModel session style, if exposed ----
    async function generateViaLanguageModel({ language, tone, mode, text, customPrompt }) {
      const LM = globalThis.LanguageModel;
      if (!LM) throw new Error("LanguageModel not present");
  
      const create = LM.createTextSession || LM.startSession || LM.create;
      if (typeof create === "function") {
        const session = await create({
          system: buildSystem(language, tone),
          output: { language },
          temperature: 0.7,
          topK: 3
        });
        if (session?.prompt) {
          const res = await session.prompt(buildUserPrompt(mode, language, tone, text, customPrompt));
          return typeof res === "string" ? res : (res?.text || JSON.stringify(res));
        }
      }
  
      if (typeof LM.generate === "function") {
        const res = await LM.generate({
          task: mode, tone,
          output: { language },
          prompt: buildUserPrompt(mode, language, tone, text, customPrompt),
          system: buildSystem(language, tone),
          temperature: 0.7,
          topK: 3
        });
        return (typeof res === "string") ? res : (res?.text || res?.output || JSON.stringify(res));
      }
  
      throw new Error("No supported LanguageModel session/generate method");
    }
  
    // ---- Local deterministic fallback (no AI) ----
    function localTransform({ mode, tone, language, text, customPrompt }) {
      if (!text) return "";
      const customNote = customPrompt ? `\ncustom: ${customPrompt}` : '';
      switch (mode) {
        case "summarize": {
          const firstTwo = text.split(/(?<=\.|\?|!)\s/).slice(0,2).join(" ");
          return `[local summary • tone=${tone} • lang=${language}${customNote}]\n${firstTwo}`;
        }
        case "translate": return `[local translate placeholder → ${language}${customNote}]\n${text}`;
        case "proofread": return `[local proofread placeholder • tone=${tone} • lang=${language}${customNote}]\n${text}`;
        case "rewrite":
        default: return `[local rewrite placeholder • tone=${tone} • lang=${language}${customNote}]\n${text}`;
      }
    }
  
    // ---- Handlers ----
    async function onRun() {
      LOG("Run clicked");
      const text = getInput();
      if (!text) { 
        setStatus("Please paste some text first.", "warning"); 
        return; 
      }
  
      const customPrompt = getCustomPrompt();
      const payload = {
        mode: els.mode.value || "rewrite",
        tone: els.tone.value || "professional",
        language: getLang(),
        text,
        customPrompt
      };
  
      setLoading(true);
      setStatus("Checking built-in AI…", "info");
      const avail = await checkAvailability();
      LOG("availability:", avail);
  
      if (avail === "downloading") { 
        setStatus("Downloading on-device runtime…", "warning");
        setHint("downloading");
      } else if (avail === "available") { 
        setStatus("On-device runtime available.", "success");
        setHint("built-in AI");
      } else if (avail === "installed" || avail === "ready") { 
        setStatus("Initializing on-device runtime…", "info");
        setHint("initializing");
      } else { 
        setStatus("No on-device runtime — using local fallback.", "warning");
        setHint("local preview");
      }
  
      let output;
      if (avail !== "available") {
        output = localTransform(payload);
        outText(output);
        setLoading(false);
      } else {
        try {
          setStatus("Generating…", "info");
          if (window.ai?.createTextSession) {
            output = await generateViaWindowAI(payload);
          } else {
            output = await generateViaLanguageModel(payload);
          }
          outText(output || localTransform(payload));
          setStatus("Done!", "success");
        } catch (e) {
          ERR("runtime generation failed", e);
          output = localTransform(payload);
          outText(output);
          setStatus("Local fallback shown (runtime error).", "warning");
        } finally {
          setLoading(false);
        }
      }
  
      // Add to history
      addToHistory({
        timestamp: Date.now(),
        input: text,
        output: output || "",
        mode: payload.mode,
        tone: payload.tone,
        language: payload.language,
        customPrompt: customPrompt
      });
    }
  
    async function onCopy() {
      const s = els.out.textContent || "";
      if (!s) { 
        setStatus("Nothing to copy.", "warning"); 
        return; 
      }
      try { 
        await navigator.clipboard.writeText(s); 
        setStatus("Copied to clipboard!", "success");
        setTimeout(() => {
          checkAvailability().then(status => {
            if (status === "available") setStatus("Ready", "success");
            else setStatus("Ready (fallback mode)", "warning");
          });
        }, 2000);
      } catch (e) { 
        ERR("copy failed", e); 
        setStatus("Copy failed.", "warning"); 
      }
    }
  
    // ---- Listen for messages from service worker (context menu actions) ----
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg?.type === "PROMPTLY_SET_INPUT") {
        LOG("Received text from context menu:", msg.text?.substring(0, 50) + "...");
        els.input.value = msg.text || "";
        if (msg.mode) {
          els.mode.value = msg.mode;
        }
        if (msg.tone) {
          els.tone.value = msg.tone;
        }
        if (msg.autoRun) {
          setTimeout(() => onRun(), 300);
        }
      }
    });
  
    // ---- Init ----
    (async function init() {
      LOG("sidepanel DOM ready");
      setStatus("Checking built-in AI…", "info");
      els.run?.addEventListener("click", onRun);
      els.copy?.addEventListener("click", onCopy);
  
      // Load history
      await loadHistory();
  
      const s = await checkAvailability();
      if (s === "available") { 
        setStatus("Ready", "success"); 
        setHint("built-in AI"); 
      } else if (s === "downloading") { 
        setStatus("Downloading on-device runtime…", "warning"); 
        setHint("downloading"); 
      } else if (s === "installed" || s === "ready") { 
        setStatus("Initializing on-device runtime…", "info"); 
        setHint("initializing"); 
      } else { 
        setStatus("Ready (fallback mode)", "warning"); 
        setHint("local preview"); 
      }
    })();
  })();