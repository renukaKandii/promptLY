// --- promptLY background / service worker ---
// Creates context menus, opens side panel, and routes Side Panel actions
// to Chrome's built-in AI (Gemini Nano) when available, with graceful fallbacks.

const DEFAULT_OUTPUT_LANG = "en";

(() => {
  const LM = globalThis.LanguageModel;
  if (!LM) return;
  const patch = (name) => {
    const orig = LM[name];
    if (typeof orig !== "function" || orig.__patched) return;
    const bound = orig.bind(LM);
    const wrapped = (arg, ...rest) => {
      if (arg && typeof arg === "object") {
        if (!arg.output) arg.output = {};
        if (!arg.output.language) arg.output.language = "en";
      }
      return bound(arg, ...rest);
    };
    wrapped.__patched = true;
    LM[name] = wrapped;
  };
  patch("generate");
  patch("generateText");
})();


// ---------- install / menus / side panel ----------
chrome.runtime.onInstalled.addListener(async () => {
  // Single context menu item - much cleaner!
  chrome.contextMenus.create({
    id: "promptly_open",
    title: "promptLY",
    contexts: ["selection"]
  });

  // Open the Side Panel when the toolbar icon is clicked
  if (chrome.sidePanel?.setPanelBehavior) {
    await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  }
  log("installed");
});

function sendToast(tabId, text) {
  chrome.tabs.sendMessage(tabId, { type: "PROMPTLY_TOAST", text }, () => {
    if (chrome.runtime.lastError) {
      chrome.scripting.executeScript(
        { target: { tabId }, files: ["src/content/content.js"] },
        () => chrome.tabs.sendMessage(tabId, { type: "PROMPTLY_TOAST", text })
      );
    }
  });
}

// Context menu click handler - opens side panel with selected text
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.id || !info.selectionText) return;

  log(`Context menu clicked, opening side panel...`);

  try {
    // Open the side panel
    await chrome.sidePanel.open({ windowId: tab.windowId });
    
    // Wait a bit for panel to open, then send the text
    setTimeout(() => {
      chrome.runtime.sendMessage({
        type: "PROMPTLY_SET_INPUT",
        text: info.selectionText,
        autoRun: false // Do NOT auto-run - let user configure and click Run
      });
    }, 300);
    
    // Show toast notification
    sendToast(tab.id, `promptLY: Opening side panel...`);
  } catch (e) {
    log("Error opening side panel:", e);
    sendToast(tab.id, "promptLY: Could not open side panel");
  }
});


// ------------------------------------------------------------
// Built-in AI (Gemini Nano) adapter with simple model caching
// ------------------------------------------------------------

const promptlyModels = {
  rewriter:    null,
  summarizer:  null,
  proofreader: null,
  translator:  null,
};

function log(...args) { console.log("[promptLY]", ...args); }

async function ensureBuiltInAvailable() {
  return Boolean((chrome && chrome.ai) || (globalThis && globalThis.ai));
}

// check if a specific API surface exists on this build
function hasSurface(kind) {
  const a = chrome.ai || globalThis.ai || {};
  return Boolean(
    (kind === "rewriter"   && a.rewriter?.create)   ||
    (kind === "summarizer" && a.summarizer?.create) ||
    (kind === "proofreader"&& a.proofreader?.create)||
    (kind === "translator" && a.translator?.create)
  );
}

// run a function; if it throws (surface not ready), return fallback instead
async function runOrFallback(runFn, fallbackFn, label) {
  try { return await runFn(); }
  catch (e) { log(`${label} fell back:`, e?.message || e); return await fallbackFn(); }
}

// ----- Rewriter -----
async function getRewriterModel() {
  if (promptlyModels.rewriter) return promptlyModels.rewriter;
  if (chrome.ai?.rewriter?.create) {
    promptlyModels.rewriter = await chrome.ai.rewriter.create();
    return promptlyModels.rewriter;
  }
  if (globalThis.ai?.rewriter?.create) {
    promptlyModels.rewriter = await globalThis.ai.rewriter.create();
    return promptlyModels.rewriter;
  }
  throw new Error("Chrome built-in AI Rewriter not available.");
}

async function runRewriter(text, tone = "professional") {
  const model = await getRewriterModel();
  const input = (text || "").trim();
  if (!input) return "";
  const toneMap = { professional: "professional", casual: "casual", curious: "curious", poetic: "poetic" };
  const toneOpt = toneMap[tone] || "professional";
  const result = await model.rewrite(input, { tone: toneOpt, outputLanguage: DEFAULT_OUTPUT_LANG });
  return typeof result === "string" ? result : (result?.text ?? JSON.stringify(result));
}

async function fallbackRewrite(text, tone) {
  return `[local AI not available]\n` +
         `tone: ${tone}\n\n` +
         (text || "").replace(/\s+/g, " ").slice(0, 4000);
}

// ----- Summarizer -----
async function getSummarizerModel() {
  if (promptlyModels.summarizer) return promptlyModels.summarizer;
  if (chrome.ai?.summarizer?.create) {
    promptlyModels.summarizer = await chrome.ai.summarizer.create();
    return promptlyModels.summarizer;
  }
  if (globalThis.ai?.summarizer?.create) {
    promptlyModels.summarizer = await globalThis.ai.summarizer.create();
    return promptlyModels.summarizer;
  }
  throw new Error("Chrome built-in AI Summarizer not available.");
}

async function runSummarizer(text, ratio = 0.35) {
  const model = await getSummarizerModel();
  const input = (text || "").trim();
  if (!input) return "";
  const result = await model.summarize(input, { compression: ratio, outputLanguage: DEFAULT_OUTPUT_LANG });
  return typeof result === "string" ? result : (result?.text ?? JSON.stringify(result));
}

async function fallbackSummarize(text) {
  const first = (text || "").split(/(?<=[.!?])\s+/).slice(0, 2).join(" ");
  return `[local AI not available]\nsummary (approx):\n\n${first}`;
}

// ----- Proofreader -----
async function getProofreaderModel() {
  if (promptlyModels.proofreader) return promptlyModels.proofreader;
  if (chrome.ai?.proofreader?.create) {
    promptlyModels.proofreader = await chrome.ai.proofreader.create();
    return promptlyModels.proofreader;
  }
  if (globalThis.ai?.proofreader?.create) {
    promptlyModels.proofreader = await globalThis.ai.proofreader.create();
    return promptlyModels.proofreader;
  }
  throw new Error("Chrome built-in AI Proofreader not available.");
}

async function runProofreader(text) {
  const model = await getProofreaderModel();
  const input = (text || "").trim();
  if (!input) return "";
  const result = await model.proofread(input, { outputLanguage: DEFAULT_OUTPUT_LANG });
  return typeof result === "string" ? result : (result?.text ?? JSON.stringify(result));
}

async function fallbackProofread(text) {
  const cleaned = (text || "").replace(/\s+/g, " ").trim();
  return `[local AI not available]\nproofread (approx):\n\n${cleaned}`;
}

// ----- Translator -----
async function getTranslatorModel() {
  if (promptlyModels.translator) return promptlyModels.translator;
  if (chrome.ai?.translator?.create) {
    promptlyModels.translator = await chrome.ai.translator.create();
    return promptlyModels.translator;
  }
  if (globalThis.ai?.translator?.create) {
    promptlyModels.translator = await globalThis.ai.translator.create();
    return promptlyModels.translator;
  }
  throw new Error("Chrome built-in AI Translator not available.");
}

async function runTranslator(text, targetLanguage = "en") {
  const model = await getTranslatorModel();
  const input = (text || "").trim();
  if (!input) return "";
  const result = await model.translate(input, { targetLanguage, outputLanguage: targetLanguage });
  return typeof result === "string" ? result : (result?.text ?? JSON.stringify(result));
}

async function fallbackTranslate(text, targetLanguage = "en") {
  return `[local AI not available]\ntranslation target: ${targetLanguage}\n\n${text}`;
}

async function runModeAndReplace(tabId, mode, text, tone = "professional") {
  const out = await (async () => {
    if (mode === "rewrite") {
      return hasSurface("rewriter")
        ? await runOrFallback(() => runRewriter(text, tone), () => fallbackRewrite(text, tone), "rewrite")
        : await fallbackRewrite(text, tone);
    }
    if (mode === "summarize") {
      return hasSurface("summarizer")
        ? await runOrFallback(() => runSummarizer(text, 0.35), () => fallbackSummarize(text), "summarize")
        : await fallbackSummarize(text);
    }
    if (mode === "proofread") {
      return hasSurface("proofreader")
        ? await runOrFallback(() => runProofreader(text), () => fallbackProofread(text), "proofread")
        : await fallbackProofread(text);
    }
    if (mode === "translate") {
      return hasSurface("translator")
        ? await runOrFallback(() => runTranslator(text, "en"), () => fallbackTranslate(text, "en"), "translate")
        : await fallbackTranslate(text, "en");
    }
    return "(unknown mode)";
  })();

  chrome.tabs.sendMessage(tabId, { type: "PROMPTLY_REPLACE", text: out });
}


// ------------------------------------------------------------
// Messages from Side Panel
// ------------------------------------------------------------
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  (async () => {
    if (msg?.type !== "PROMPTLY_PANEL_RUN") return;

    const { text, mode, tone } = msg.payload || {};
    log("panel run:", mode, { tone, len: (text || "").length });

    try {
      if (mode === "rewrite") {
        const out = hasSurface("rewriter")
          ? await runOrFallback(() => runRewriter(text, tone), () => fallbackRewrite(text, tone), "rewrite")
          : await fallbackRewrite(text, tone);
        sendResponse(out);
        return;
      }

      if (mode === "summarize") {
        const out = hasSurface("summarizer")
          ? await runOrFallback(() => runSummarizer(text, 0.35), () => fallbackSummarize(text), "summarize")
          : await fallbackSummarize(text);
        sendResponse(out);
        return;
      }

      if (mode === "proofread") {
        const out = hasSurface("proofreader")
          ? await runOrFallback(() => runProofreader(text), () => fallbackProofread(text), "proofread")
          : await fallbackProofread(text);
        sendResponse(out);
        return;
      }

      if (mode === "translate") {
        const out = hasSurface("translator")
          ? await runOrFallback(() => runTranslator(text, "en"), () => fallbackTranslate(text, "en"), "translate")
          : await fallbackTranslate(text, "en");
        sendResponse(out);
        return;
      }

      sendResponse("(unknown mode)");
    } catch (e) {
      log("panel run error:", e);
      sendResponse(`promptLY error: ${e?.message || e}`);
    }
  })();

  return true; // async
});