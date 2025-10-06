// --- promptLY content script ---
// Shows toasts and replaces the current selection inline.

function showToast(text, ms = 1800) {
    const el = document.createElement("div");
    el.textContent = text || "promptLY";
    Object.assign(el.style, {
      position: "fixed",
      right: "20px",
      bottom: "20px",
      zIndex: 2147483647,
      padding: "14px 20px",
      maxWidth: "380px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#fff",
      font: "14px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial",
      borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4), 0 4px 12px rgba(0,0,0,.2)",
      opacity: "0",
      transform: "translateY(10px) scale(0.95)",
      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      fontWeight: "500",
      letterSpacing: "0.2px",
      backdropFilter: "blur(10px)"
    });
    
    document.documentElement.appendChild(el);
    
    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0) scale(1)";
      });
    });
    
    // Animate out and remove
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px) scale(0.95)";
      setTimeout(() => el.remove(), 300);
    }, ms);
  }
  
  function replaceSelection(text) {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return false;
    const range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
    sel.removeAllRanges();
    return true;
  }
  
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg?.type === "PROMPTLY_TOAST") {
      showToast(msg.text, 1600);
    }
    
    if (msg?.type === "PROMPTLY_REPLACE") {
      const ok = replaceSelection(msg.text || "");
      showToast(ok ? "promptLY: replaced ✓" : "promptLY: couldn't replace here");
    }
  });