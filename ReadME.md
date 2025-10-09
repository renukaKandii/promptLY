# promptLY

<div align="center">

![promptLY Logo](icons/icon.png)

**Your thoughts, refined — instantly**

Need to humanize AI text? No internet? Don't want to switch tabs? **Your AI is right here.**

Select text → Right-click → promptLY. Transform anything instantly. Reply to emails. Simplify complex content. All on-device, completely private.

**No internet needed.** **No data leaves your system.** **Built-in AI making miracles happen.**

---

A Chrome extension that transforms your writing using on-device AI (Gemini Nano) — completely private, no cloud, no subscriptions.

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-blue?style=flat&logo=google-chrome)](#)
[![Built with AI](https://img.shields.io/badge/Built%20with-Chrome%20AI-purple)](https://developer.chrome.com/docs/ai/built-in)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Quick Prompts](#quick-prompts-explained) • [Roadmap](#roadmap--possible-future-features)

</div>

---

## 💭 Why promptLY?

**Ever been stuck in these situations?**

- 📧 **Need to reply to an email?** Don't want to open ChatGPT, copy-paste, wait, copy-paste back...
- 🤖 **AI text sounds robotic?** Need to humanize it but switching tabs breaks your flow...
- ✈️ **On a plane with no WiFi?** Can't use cloud AI tools...
- 🔒 **Handling sensitive data?** Company policy says no external AI...
- 💸 **Hit your free limit?** ChatGPT capped and you need one more rewrite...
- ⚡ **Just want it quick?** Select → Right-click → Done. No tab juggling...

**promptLY solves all of this.**

Your AI lives in Chrome. No internet after setup. No data leaving your device. No subscriptions. No limits.

**Need to humanize?** Right-click → promptLY → Humanize → Run. Done.

**Need to reply to email?** Select → Right-click → promptLY → Reply to Email → Run. Send.

**Working offline?** Built-in AI doesn't need WiFi. Everything stays on your laptop.

It's AI, but **private. Fast. Always there. Right where you need it.**

---

## 🎯 What is promptLY?

A **text transformation tool** using Chrome's built-in AI - all processing happens **100% on-device**.

promptLY uses Chrome's built-in Language Model API (Gemini Nano on-device) for text rewriting and summarization. When available, it automatically connects to window.ai / chrome.ai; otherwise, it uses the underlying LanguageModel API to maintain compatibility.

**Core capabilities:**
- ✅ Rewrite, summarize, translate, proofread text
- ✅ Reply to emails professionally
- ✅ Humanize robotic AI text
- ✅ Simplify complex content
- ✅ Answer questions with custom instructions
- ✅ Solve problems step-by-step
- ✅ And much more with custom prompts!

---

## ✨ Features

### 🔐 **Privacy First**
- **100% on-device processing** using Chrome's built-in Gemini Nano
- **No data leaves your machine** — no cloud APIs, no tracking, no subscriptions
- Your text stays private, always

### 🚀 **Core Modes**
- **Rewrite** - Transform text style and clarity (default)
- **Summarize** - Condense long content into key points
- **Translate** - Convert to different languages
- **Proofread** - Fix grammar, spelling, and clarity

### ⚡ **Quick Prompts**
Pre-configured transformations for common tasks:

1. **Simplify (ELI5)** - Explain anything using simple, everyday language
2. **Elaborate** - Add more details, context, and real-world examples
3. **Reply to Email** - Draft professional email responses *(Works ~99% of the time)*
4. **Humanize** - Remove robotic tone and make text sound more natural

### 💭 **Custom Instructions**
Write your own prompts for unlimited flexibility:
- "Answer this question in detail"
- "Solve this step-by-step"
- "Write an academic style report"
- "Make this more persuasive"
- Anything you can imagine!

### 📜 **Smart History**
- Saves your last 10 transformations
- Click any history item to restore input, settings, and output
- Organized by mode and timestamp

### 🎨 **Intuitive UI**
- Modern, dark-themed interface
- Compact design fits in Chrome's side panel
- Visual feedback for selected prompts (blue border highlights active selection)
- Stop button to cancel long-running generations (waits for completion, then discards result)
- Auto-clear output on new Run for clean slate
- **NEW:** Inline status messages in Input header - see "Generating...", "Done!", "Copied!" right where you're working
- **NEW:** Custom Instructions hidden by default to save space - auto-expands when Quick Prompt is clicked
- **NEW:** Helpful tooltip on "Reply to Email" prompt - hover to see usage tips
- **NEW:** All action feedback (copy, clear, reset) appears inline for better visibility

---

## 🛠️ Installation

### Step 1: Enable Chrome Flags

1. **Enable Optimization Guide:**
   - Copy and paste in address bar: `chrome://flags/#optimization-guide-on-device-model`
   - Select: **"Enabled BypassPerfRequirement"** from the dropdown

2. **Enable Prompt API:**
   - Copy and paste in address bar: `chrome://flags/#prompt-api-for-gemini-nano`
   - Select: **"Enabled"** from the dropdown

3. **Restart Chrome:**
   - Click the blue **"Relaunch"** button that appears at the bottom
   - Chrome will close and reopen

✅ Flags enabled!

---

### Step 2: Check for window.ai API (Optional Check)

1. **Press F12** to open Developer Console

2. **Type and press Enter:**
   ```javascript
   window.ai
   ```

3. **What you see:**

   **If you see an object** like `{languageModel: ...}` ✅
   - Great! You have this API.
   - Download the model:
     ```javascript
     await ai.languageModel.create()
     ```
   - Wait 5-10 minutes for the ~2GB download
   - Skip to Step 4

   **If you see `undefined`**
   - Don't worry! This is normal (Google's gradual rollout process)
   - You can try Chrome Dev or Canary if you want this specific API
   - Or just **continue to Step 3** - the LanguageModel API works just as well!

---

### Step 3: Check for LanguageModel API (Main Method)

Most users will use this method:

1. **In the console, type:**
   ```javascript
   LanguageModel
   ```

2. **Expected result:**
   ```javascript
   ƒ LanguageModel() { [native code] }
   ```

3. **What this means:**

   ✅ **If you see this function** - Perfect! AI is available. Continue below:
   
   ```javascript
   await LanguageModel.create({ output: { language: "en" } })
   ```
   
   - This downloads the ~2GB AI model
   - **Wait 5-10 minutes** for download to complete
   - Chrome might feel slow during download - this is normal
   
   ❌ **If you see "not defined"** - Something's wrong:
   - Make sure you're on Chrome 127+ (check `chrome://version`)
   - Go back to Step 1 and verify you enabled BOTH flags correctly
   - Make sure you clicked "Relaunch" and Chrome restarted
   - Close ALL Chrome windows completely and reopen
   - If still not working, see [Troubleshooting](#troubleshooting)

---

### Step 4: Verify Model Downloaded

1. **Go to Chrome Components:**
   - Copy and paste: `chrome://components`

2. **Find "Optimization Guide On Device Model":**
   - Scroll through the list to find this component

3. **Check the version:**
   - **Version: 0.0.0.0** → Still downloading, wait longer
   - **Version: 2024.xx.xx.xxxx** (has numbers) → ✅ **Downloaded and ready!**
   - **Not in the list** → Download hasn't started yet, go back to Step 3

✅ **Once you see a version with numbers, the AI model is ready!**

---

### Step 5: Install promptLY Extension

**Option 1: From Chrome Web Store** *(Coming Soon)*
- Visit the Chrome Web Store listing
- Click **"Add to Chrome"**
- Click **"Add extension"** in the popup
- Done!

**Option 2: Manual Installation**

1. **Download promptLY:**
   ```bash
   git clone https://github.com/renukaKandii/promptly.git
   ```
   Or download ZIP and extract

2. **Open Extensions Page:**
   ```
   chrome://extensions
   ```

3. **Enable Developer Mode:**
   - Toggle the switch in the top-right corner

4. **Load the extension:**
   - Click **"Load unpacked"** button (top-left)
   - Select the `promptly` folder (contains manifest.json)
   - Extension appears in your list

5. **Pin to toolbar (recommended):**
   - Click puzzle icon 🧩 in toolbar
   - Find "promptLY"
   - Click pin icon 📌

✅ **Installation complete!** Right-click any text to try it!

---

## 🎮 Usage

### Quick Start

1. **Select any text** on any webpage
2. **Right-click** → Click **"promptLY"**
3. Side panel opens with your text
4. **(Optional)** Choose mode, tone, or click a Quick Prompt
5. **Click ▶ Run**
6. **Click 📋 Copy** to use the result

---

### Method 1: Right-Click Context Menu (Recommended)

Perfect for transforming text you find on websites:

1. Select text on any webpage
2. Right-click → **"promptLY"**
3. Side panel opens with:
   - Your text in Input field
   - Mode: Rewrite
   - Tone: Professional
4. (Optional) Change settings or click a Quick Prompt
5. Click **▶ Run**
6. Watch the inline status: "⚡ Generating..." → "✅ Done!"
7. Copy the output!

---

### Method 2: Direct Side Panel Use

Perfect for pasting content or writing from scratch:

1. Click the **promptLY icon** in your toolbar
2. Paste or type your text
3. Choose Mode, Tone, Language
4. (Optional) Click a Quick Prompt (Custom Instructions auto-expands!)
5. Click **▶ Run**
6. Review and copy!

---

### Using Quick Prompts

Quick Prompts are one-click transformations:

1. Open promptLY
2. Paste your text
3. **Click a Quick Prompt card:**
   - Simplify (ELI5)
   - Elaborate
   - **Reply to Email** *(Hover to see tooltip with usage tip!)*
   - Humanize
4. Custom Instructions auto-expands showing the prompt (you can edit it!)
5. Card highlights with blue border
6. Click **▶ Run**

💡 **Tip:** Hover over the "Reply to Email" card to see helpful guidance about selecting the entire email for best results!

---

### Using Custom Instructions

For maximum flexibility:

1. Open promptLY
2. Paste your text
3. Click **"+ Show Custom"** to expand Custom Instructions (or click a Quick Prompt to auto-expand)
4. Type your instruction:
   - "Answer this question in detail"
   - "Solve this math problem step-by-step"
   - "Make this more persuasive"
5. Click **▶ Run**

---

### Managing History

- promptLY saves your last 10 transformations
- Click any history item to restore everything
- Click **"Clear All"** to delete history

---

### Understanding Status Messages

promptLY shows status in **two places**:

**Top Status Bar:**
- Shows AI availability only
- "Ready" / "Built-in AI" / "Downloading AI model..."
- Stays mostly static

**Input Header (Inline):**
- Shows action feedback right where you work!
- "⚡ Generating..." / "✅ Done!" / "📋 Copied!"
- Auto-hides after 3 seconds
- Always visible when scrolled to input/output area

---

### Tips

- **Stop button:** Click ▶ Run while processing to stop (becomes ⏹ Stop in red)
- **Clear buttons:** Clear Input or Output anytime
- **Reset All:** Resets Mode, Tone, Language, Custom Instructions to defaults
- **Hidden by default:** Custom Instructions starts collapsed to save space
- **Works offline:** After model downloads, no internet needed!

---

## ⚡ Quick Prompts Explained

### 📝 Simplify (ELI5)

**Purpose:** Make complex content accessible to everyone, even children

**Prompt:** "Explain this like I'm 5 years old, using simple everyday language that anyone can understand."

**Best for:**
- Technical documentation
- Scientific concepts
- Legal jargon
- Academic papers

**Example:**
- **Input:** 
  ```
  Quantum entanglement is a physical phenomenon that occurs when pairs or groups of particles interact in ways such that the quantum state of each particle cannot be described independently of the state of the others.
  ```
- **Output:** 
  ```
  Imagine you have two magic coins. No matter how far apart you put them, when you flip one and it lands on heads, the other one instantly lands on tails. They're connected in a magical way that scientists call "quantum entanglement." It's like the coins can talk to each other faster than anything in the universe!
  ```

---

### 📚 Elaborate

**Purpose:** Expand brief notes into detailed, comprehensive explanations

**Prompt:** "Expand this with more details, context, and real-world examples to make it more comprehensive."

**Best for:**
- Bullet points → full paragraphs
- Brief summaries → detailed explanations
- Notes → comprehensive reports
- Outlines → fleshed-out content

**Example:**
- **Input:** 
  ```
  AI improves healthcare.
  ```
- **Output:** 
  ```
  Artificial Intelligence is revolutionizing healthcare across multiple dimensions. For instance, AI-powered diagnostic tools can analyze medical images like X-rays and MRIs with remarkable accuracy, often detecting conditions that human radiologists might miss. In drug discovery, AI algorithms can screen millions of molecular compounds in days rather than years, accelerating the development of new treatments. Additionally, AI chatbots provide 24/7 patient support, answering health questions and triaging symptoms before a doctor visit. These technologies not only improve patient outcomes but also reduce costs and increase access to quality care in underserved areas.
  ```

---

### ✉️ Reply to Email

**Purpose:** Draft professional email responses quickly and appropriately

**Prompt:** "Write my professional email reply to this message. I am responding to them, not the other way around. Keep a professional tone, thank them if appropriate, and respond to their key points naturally."

**Best for:**
- Job application responses
- Business correspondence
- Networking emails
- Customer service replies

**Important Note:** This works very reliably (~99% success rate), but occasionally the AI might misinterpret sender/recipient context in complex email threads. If the output addresses you instead of responding for you, simply click **▶ Run** again or add an explicit custom instruction.

💡 **Pro Tip:** Hover over the "Reply to Email" card in promptLY to see a helpful tooltip about selecting the entire email (from greeting to signature) for best results!

**Example:**
- **Input:** 
  ```
  Dear Sarah,

  Thank you for applying to the Senior Data Scientist position at TechCorp. We have reviewed your application and would like to invite you to a phone screening next week. Are you available Tuesday at 2 PM EST?

  Best regards,
  Michael Chen
  Hiring Manager
  ```
- **Output:** 
  ```
  Dear Michael,

  Thank you for considering my application for the Senior Data Scientist position at TechCorp. I'm excited about the opportunity and would be happy to participate in a phone screening.

  Tuesday at 2 PM EST works perfectly for me. I'll make sure I'm available and prepared to discuss my experience and how I can contribute to the team.

  Looking forward to our conversation!

  Best regards,
  Sarah
  ```

---

### 🤖 Humanize

**Purpose:** Make AI-generated or overly formal text sound natural and conversational

**Prompt:** "Rewrite this to sound more natural, human, and conversational. Remove robotic or overly formal tone."

**Best for:**
- AI-generated content
- Corporate jargon
- Legal/formal documents → friendly versions
- Stiff emails → warm messages

**Example:**
- **Input:** 
  ```
  We hereby acknowledge receipt of your communication dated October 15, 2024, and shall endeavor to provide a comprehensive response to your inquiry within the next 5-7 business days, pending internal review and consultation with relevant stakeholders.
  ```
- **Output:** 
  ```
  Thanks for reaching out on October 15th! I got your message and I'm looking into it. I'll get back to you with a full answer within the next week or so after I check with the team.
  ```

---

## 🎨 Settings & Customization

### Modes

| Mode | Purpose | Output | Best For |
|------|---------|--------|----------|
| **Rewrite** | Transform style and clarity | Same length, improved quality | General text improvement |
| **Summarize** | Condense content | ~35% of original length | Long articles, reports |
| **Translate** | Change language | Same content, different language | Multilingual communication |
| **Proofread** | Fix errors | Corrected version | Grammar, spelling, clarity |

### Tones

| Tone | Effect | Use When |
|------|--------|----------|
| **Professional** | Formal, business-appropriate | Work emails, reports, proposals |
| **Casual** | Friendly, conversational | Informal messages, social posts |
| **Curious** | Inquisitive, exploratory | Learning content, questions |
| **Poetic** | Creative, expressive | Creative writing, artistic content |

### Languages

Currently supported:
- 🇬🇧 **English (en)** - Default
- 🇪🇸 **Español (es)** - Spanish
- 🇯🇵 **日本語 (ja)** - Japanese

*More languages coming in future updates!*

### Custom Instructions Examples

The real power of promptLY! Here are proven instructions:

**Q&A:**
- "Answer this question with examples from history"
- "Provide a detailed answer with pros and cons"
- "Explain this in 3 different ways"

**Problem Solving:**
- "Solve this math problem showing all steps"
- "Break down this problem into smaller parts"
- "Explain the solution like I'm a beginner"

**Content Creation:**
- "Rewrite this as a LinkedIn post"
- "Turn this into a Twitter thread (max 280 chars each)"
- "Create a compelling headline for this"

**Tone Adjustments:**
- "Make this more confident but not arrogant"
- "Add humor without being unprofessional"
- "Make this more empathetic and understanding"

**Formatting:**
- "Format this as bullet points"
- "Rewrite as a structured outline"
- "Convert to FAQ format"

---

## 🔧 How It Works

promptLY leverages **Chrome's built-in AI APIs** (Gemini Nano) to process text entirely on your device:

```
┌─────────────┐
│  Your Text  │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│   Mode + Tone +     │
│ Custom Instructions │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Prompt Engineering │
│  (Optimized prompt) │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   Gemini Nano API   │
│  (On-Device AI)     │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Transformed Text   │
└─────────────────────┘
```

**Key Benefits:**
- ✅ **Internet needed initially** - One-time ~2GB model download
- ✅ **Then works offline** - No internet required after setup
- ✅ **No data sent anywhere** - complete privacy
- ✅ **Fast processing** - typically 2-5 seconds
- ✅ **Always available** - works anywhere after model download

---

## 🚀 Roadmap & Possible Future Features

I'm constantly thinking about how to improve promptLY. Here are features I'm considering for future versions:

### High Priority
- [ ] **Additional Languages** - French, German, Chinese, Hindi, Portuguese
- [ ] **Better Email Detection** - More robust handling of complex email threads
- [ ] **Keyboard Shortcuts** - Quick access (e.g., `Alt+P` to open panel)
- [ ] **Custom Quick Prompts** - Let users create and save their own presets
- [ ] **Persistent Custom Instructions** - Remember last used custom prompt

### Medium Priority
- [ ] **Batch Processing** - Transform multiple texts at once
- [ ] **Export History** - Download history as CSV/JSON
- [ ] **Tone Presets Expansion** - Add Friendly, Humorous, Empathetic, Urgent tones
- [ ] **Dark/Light Theme Toggle** - User preference for UI appearance
- [ ] **Word Count & Stats** - Show input/output statistics

### Future Exploration
- [ ] **Google Docs Integration** - Transform text directly in documents
- [ ] **Gmail Integration** - Reply button directly in Gmail interface
- [ ] **Voice Input** - Speak your text instead of typing
- [ ] **Templates System** - Save and reuse complex custom instructions
- [ ] **Markdown Support** - Better formatting for technical content
- [ ] **Diff View** - Show exact changes made to text
- [ ] **Multi-step Transformations** - Chain multiple operations

### Experimental Ideas
- [ ] **Collaborative Prompts** - Share custom instructions with community
- [ ] **AI Suggestions** - Recommend prompts based on input content
- [ ] **Browser-wide Search & Transform** - Transform text in any input field
- [ ] **PDF Processing** - Extract and transform PDF text

*Note: This is a solo project, so feature development depends on time availability, user feedback, and technical feasibility. Suggestions are always welcome!*

---

## 🐛 Known Issues & Limitations

### Browser & System Requirements

**Chrome Version:**
- ✅ **Chrome Stable 127+** - Fully supported (current: 141+)
- ✅ **Chrome Beta** - Fully supported
- ✅ **Chrome Dev** - Fully supported  
- ✅ **Chrome Canary** - Fully supported
- ❌ **Chrome 126 or older** - Built-in AI not available

**System Requirements:**
- **RAM:** Minimum 4GB, recommended 8GB+ (model runs in memory)
- **Storage:** ~2GB free space for Gemini Nano model
- **OS:** Windows 10+, macOS 10.15+, Linux (recent distributions)

### AI Model Limitations

**Model Download:**
- **Requires internet connection** for initial ~1.5-2GB model download
- Download happens automatically when you run the create command
- Takes 5-10 minutes depending on internet speed
- **After download, works completely offline!**
- Progress can be checked in chrome://components

**Language Support:**
- Currently limited to English, Spanish, Japanese
- Output may default to English even when other languages selected (working on fix)
- Translation quality varies by language pair

**Processing:**
- Cannot be interrupted mid-generation (Stop button waits for completion then discards)
- Longer texts (>2000 words) may take 10-15 seconds
- Very complex custom instructions may produce unexpected results

### Email Reply Feature

**Success Rate: ~99%**

Occasionally (≈1% of cases) the AI may:
- Address you instead of the sender
- Misinterpret sender/recipient in complex email threads
- Get confused by forwarded messages with nested quotes

**Best practices for email replies:**
- Select the entire email (from "Dear..." to signature)
- Hover over the "Reply to Email" card to see the tooltip reminder
- For complex threads, add explicit custom instruction

**Workarounds if it fails:**
1. Click **▶ Run** again (often works on second try)
2. Add explicit instruction: "I am replying to them, not the other way around"
3. Manually edit the generated output
4. Use Custom Instructions instead of Quick Prompt

### UI & Interaction

**Space-Saving Design:**
- Custom Instructions hidden by default (saves vertical space)
- Auto-expands when you click a Quick Prompt
- Allows Run button to be visible without scrolling
- Click "+ Show Custom" to manually expand

**Inline Status Messages:**
- Action feedback appears in Input header (between "INPUT" and "Clear")
- See "Generating...", "Done!", "Copied!" right where you're working
- Auto-hides after 3 seconds to keep UI clean
- Top status bar only shows AI availability (doesn't change during operations)

**Output Clearing:**
- Previous output is cleared when clicking Run
- This is intentional to avoid confusion with stale content
- Use History feature to restore previous outputs

**Quick Prompt Tooltip:**
- Hover over "Reply to Email" card to see usage tips
- Suggests selecting entire email for best results

**History Limitations:**
- Limited to last 10 items (saves browser storage)
- No search or filter functionality
- Cleared when browser cache is cleared

**Visual Feedback:**
- Quick Prompt cards highlight with blue border when selected
- Selection persists until you click another card
- Cannot select multiple Quick Prompts simultaneously

---

## 🤝 Contributing

This is currently a **solo project**, and I prefer to maintain the codebase myself. However, **your feedback and ideas are incredibly valuable!**

### How You Can Help

**Found a Bug?**
1. Check if it's already reported in [Issues](https://github.com/renukaKandii/promptly/issues)
2. If not, open a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Chrome version and OS
   - Screenshots if applicable

**Have a Feature Idea?**
1. Open an [Issue](https://github.com/renukaKandii/promptly/issues) with "feature request" label
2. Describe the feature and why it would be useful
3. Share your use case
4. I'll review and consider it for future updates!

**Want to Help Test?**
- Try new features and report issues
- Test on different operating systems
- Share your experience and suggestions
- Help improve documentation

**Spread the Word:**
- ⭐ Star the repository
- 📢 Share with friends and colleagues
- 📝 Write about your experience
- 💬 Discuss on social media

### What I'm NOT Looking For

- ❌ Code contributions or pull requests (I handle all development)
- ❌ Major architectural changes
- ❌ Feature implementations without prior discussion

### What I AM Looking For

- ✅ Bug reports with clear reproduction steps
- ✅ Feature suggestions and use cases
- ✅ User experience feedback
- ✅ Documentation improvements
- ✅ Testing on different systems
- ✅ Ideas for Quick Prompts
- ✅ Custom instruction examples that work well

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Chrome Built-in AI Team** - For making on-device AI accessible to developers
- **Gemini Nano** - The powerful language model that powers promptLY
- **Claude AI (Anthropic)** - For invaluable assistance during development, debugging, and iterative improvements
- **ChatGPT (OpenAI)** - For help with initial brainstorming and problem-solving
- **Early Testers** - For feedback and bug reports that made this better
- **Open Source Community** - For inspiration and best practices
- **You!** - For using promptLY and supporting privacy-focused tools

---

## 📬 Contact & Support

### Get Help

- 📖 **Documentation:** You're reading it!
- 🐛 **Report Bugs:** [GitHub Issues](https://github.com/renukaKandii/promptly/issues)
- 💡 **Feature Requests:** [GitHub Issues](https://github.com/renukaKandii/promptly/issues)
- ❓ **Questions:** Feel free to open an issue!

### Connect

- 📧 **Email:** knrenu4601@gmail.com
- 💼 **LinkedIn:** [Naga Renuka Kandi](https://www.linkedin.com/in/naga-renuka-kandi/)
- 🐙 **GitHub:** [@renukaKandii](https://github.com/renukaKandii)

### Response Time

Since this is a solo project:
- **Bugs:** I aim to respond within 2-3 days
- **Feature requests:** May take longer to evaluate

Please be patient! I work on this in my free time. 😊

---

## 💖 Support the Project

If you find promptLY useful, here's how you can show support:

- ⭐ **Star this repository** - Helps others discover it
- 🐛 **Report bugs** - Makes it better for everyone
- 💡 **Share ideas** - Your feedback shapes the roadmap
- 📢 **Tell others** - Share on social media, blogs, forums
- 📝 **Write a review** - When it's on Chrome Web Store

**Every bit of support motivates me to keep improving promptLY!**

---

## 🔒 Privacy Policy

### Simple Version

**I don't collect anything. Ever.**

### Detailed Version

promptLY is built with privacy as the #1 priority:

**What I DON'T collect:**
- ❌ No analytics or tracking
- ❌ No telemetry or usage statistics
- ❌ No crash reports or error logs
- ❌ No user accounts or authentication
- ❌ No text content (input or output)
- ❌ No browsing history or behavior
- ❌ No IP addresses or location data

**How your data is handled:**
- ✅ All text processing happens **on your device**
- ✅ History stored **locally in your browser** only
- ✅ Settings saved **locally in Chrome storage**
- ✅ No servers, no databases, no cloud storage
- ✅ No third-party services or APIs
- ✅ No cookies, no tracking pixels

**What Chrome sees:**
- Chrome's built-in AI processes your text locally
- Google may collect anonymous usage statistics about the AI feature itself (not your content)
- See [Chrome's AI Privacy](https://support.google.com/chrome) for details

**Open Source:**
- You can audit the entire codebase
- No hidden tracking or data collection
- See `manifest.json` for all permissions requested

---

## ⚠️ Disclaimer

promptLY is an **experimental tool** using browser AI APIs. 

**Important notes:**

**Accuracy:**
- AI-generated content may occasionally be incorrect, biased, or unexpected
- Always review outputs before using them for important purposes
- Not suitable for critical legal, medical, or financial documents without human review

**Reliability:**
- Chrome's built-in AI APIs may change in future versions
- Features may stop working if Chrome updates affect AI availability

**Responsibility:**
- You are responsible for reviewing and using generated content appropriately
- I am not liable for any consequences of using AI-generated text
- Use professional judgment for business-critical content

**Best Practices:**
- ✅ Review all AI outputs before using
- ✅ Fact-check important information
- ✅ Use as a writing aid, not a replacement for human judgment
- ✅ Keep critical documents backed up separately

---

## 🔍 FAQ

### General Questions

**Q: Is promptLY really free?**
A: Yes! No subscriptions, no in-app purchases, no ads. Completely free and open source.

**Q: Does it work offline?**
A: Yes! After the initial model download (requires internet), all processing happens on your device offline. You only need internet once for setup.

**Q: What languages are supported?**
A: Currently English, Spanish (Español), and Japanese (日本語). More coming soon!

**Q: Can I use this for work/commercial purposes?**
A: Yes! MIT License allows commercial use. However, always review AI outputs for professional contexts.

---

### Setup & Technical Questions

**Q: Why do I need Chrome 127+?**
A: Chrome's built-in AI (Gemini Nano) was introduced in version 127. Earlier versions don't have the necessary AI capabilities.

**Q: I get "ai is not defined" OR "LanguageModel is not defined". What's wrong?**
A: The flags aren't enabled correctly. Go back to Step 1, make sure you enabled BOTH flags with the exact options shown, click "Relaunch", then close ALL Chrome windows and reopen fresh.

**Q: How do I know if the AI model is ready?**
A: Check `chrome://components` and look for "Optimization Guide On Device Model". If the version shows numbers (not 0.0.0.0), it's ready!

**Q: I don't see "Optimization Guide On Device Model" in chrome://components**
A: Run `await LanguageModel.create({ output: { language: "en" } })` in console to trigger the download. Check components again after a few minutes.

**Q: Can I use this on Firefox/Safari/Edge?**
A: No. Chrome's built-in AI is Chrome-specific. Other browsers may add similar features in the future.

**Q: Why is the model download so large?**
A: Gemini Nano is a powerful AI model that runs entirely on your device. The ~2GB size is necessary for its capabilities.

**Q: Does window.ai or LanguageModel work?**
A: promptLY supports BOTH! It automatically detects which API is available on your Chrome and uses it. You don't need to worry about which one you have.

---

### Privacy Questions

**Q: Is my text sent to any servers?**
A: No! All processing happens locally on your device. Zero data leaves your machine.

**Q: Can my employer/school see what I'm transforming?**
A: No. Unlike cloud AI tools, promptLY doesn't send data anywhere, so there's no server logs to monitor.

**Q: Does Google see my prompts?**
A: No. Your text stays on your device. Google may collect anonymous usage statistics about the AI feature itself (not your content).

---

### Usage Questions

**Q: Why didn't "Reply to Email" work correctly?**
A: In rare cases (~1%), the AI may misinterpret sender/recipient. Try selecting the entire email (greeting to signature), click Run again, or add the explicit custom instruction shown in the tooltip.

**Q: Where do I see the tooltip for Reply to Email?**
A: Hover your mouse over the "Reply to Email" Quick Prompt card. A tooltip will appear with usage tips.

**Q: Where do status messages appear?**
A: Status messages appear in two places: (1) Top bar shows AI availability ("Ready", "Built-in AI"), and (2) Input header shows action feedback ("Generating...", "Done!", "Copied!") right where you're working.

**Q: Why is Custom Instructions hidden by default?**
A: To save vertical space so you can see the Run button without scrolling. It auto-expands when you click a Quick Prompt, or you can manually show it with the "+ Show Custom" button.

**Q: How do I export my history?**
A: Currently, history is browser-local only. Export feature is planned for future versions.

**Q: Can I customize the Quick Prompts?**
A: Not yet, but custom Quick Prompts are planned for a future update. For now, use Custom Instructions for your own prompts.

---

### Troubleshooting Questions

**Q: promptLY won't install. What do I do?**
A: Make sure you're using Chrome 127+ (check `chrome://version`), and that you've enabled Developer Mode in `chrome://extensions/`.

**Q: The extension shows "AI not available" or "local fallback"**
A: The AI model isn't downloaded yet. Go to `chrome://components`, find "Optimization Guide On Device Model", and click "Check for update". Or run `await LanguageModel.create({ output: { language: "en" } })` in console.

**Q: It says the model is downloading. How long does it take?**
A: Usually 5-10 minutes depending on your internet speed. You can continue using Chrome normally during download.

**Q: Why is processing slow?**
A: Large texts or complex instructions take longer. Performance also depends on your device's CPU/RAM. Close other tabs to free up resources.

**Q: The Stop button doesn't immediately stop generation**
A: Chrome's AI APIs don't support mid-generation interruption. The Stop button signals to discard the result once generation completes (usually within seconds).

---

## 🎓 Tips & Tricks

### Writing Better Custom Instructions

**Be Specific:**
```
❌ "Make it better"
✅ "Make this more persuasive by adding statistics and social proof"
```

**Define the Audience:**
```
❌ "Simplify this"
✅ "Explain this to a high school student learning biology"
```

**Specify Format:**
```
❌ "Give me key points"
✅ "Extract 5 bullet points, each under 15 words"
```

**Combine Multiple Instructions:**
```
✅ "Rewrite this email in a friendly but professional tone, keep it under 100 words, and add a clear call-to-action at the end"
```

### Maximizing Output Quality

1. **Start with good input** - AI can't fix unclear source material
2. **Use specific modes** - Summarize for long content, Rewrite for quality
3. **Iterate** - Run multiple times with tweaked instructions
4. **Compare outputs** - Use History to compare different approaches
5. **Edit the result** - AI gets you 80% there; polish the rest manually

### Productivity Hacks

**Quick Email Responses:**
1. Select the email you received (entire email for best results!)
2. Right-click → promptLY
3. Click "Reply to Email"
4. Click Run → Copy → Send!

**Learning from Articles:**
1. Select a complex paragraph
2. Right-click → promptLY
3. Click "Simplify (ELI5)"
4. Understand easily!

**Humanizing AI Content:**
1. Paste AI-generated text
2. Click "Humanize" Quick Prompt
3. Run → Much more natural!

---

## 📊 Troubleshooting

### AI Not Available

**Symptom:** Extension shows "AI not available - local mode" or you get errors in console

**Solutions:**

1. **Verify Chrome version:**
   - Go to `chrome://version`
   - Must be 127 or higher

2. **Check flags are enabled:**
   - `chrome://flags/#optimization-guide-on-device-model` → "Enabled BypassPerfRequirement"
   - `chrome://flags/#prompt-api-for-gemini-nano` → "Enabled"

3. **Verify API is available:**
   - Open console (F12)
   - Type: `LanguageModel`
   - Should see: `ƒ LanguageModel() { [native code] }`
   - If "not defined" → Flags didn't work, restart Chrome completely

4. **Download the model:**
   - In console: `await LanguageModel.create({ output: { language: "en" } })`
   - Wait 5-10 minutes
   - Check `chrome://components` for "Optimization Guide On Device Model"

---

### Model Won't Download

**Symptom:** chrome://components doesn't show the model or version is 0.0.0.0

**Solutions:**

1. Run the create command in console to trigger download:
   ```javascript
   await LanguageModel.create({ output: { language: "en" } })
   ```

2. Wait at least 10 minutes (it's a 2GB download)

3. Check your internet connection

4. Refresh chrome://components page

5. If still not downloading, try Chrome Dev or Canary

---

### Extension Shows "Local Fallback"

**Symptom:** promptLY works but shows placeholder text instead of AI-generated content

**Solutions:**

1. Model isn't downloaded - check chrome://components
2. Reload the extension in chrome://extensions
3. Make sure flags are still enabled
4. Try running the create command again in console

---

<div align="center">

---

**Built with ❤️ and ☕ by Naga Renuka Kandi**

*Privacy-first • On-device • Open source*

---

⭐ **Star this repo if you find it useful!** ⭐

[Report Bug](https://github.com/renukaKandii/promptly/issues) • [Request Feature](https://github.com/renukaKandii/promptly/issues) • [LinkedIn](https://www.linkedin.com/in/naga-renuka-kandi/)

</div>