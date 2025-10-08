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

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Quick Prompts](#-quick-prompts-explained) • [Roadmap](#-roadmap--possible-future-features)

</div>

---

## 💭 Why promptLY?

**Ever been stuck in these situations?**

- 📧 **Need to reply to an email?** Don't want to open ChatGPT, copy-paste, wait, copy-paste back...
- 🤖 **AI text sounds robotic?** Need to humanize it but switching tabs breaks your flow...
- ✈️ **On a plane with no WiFi?** All those cloud AI tools are useless...
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

promptLY is a **text transformation tool** that leverages Chrome's built-in AI to help you rewrite, summarize, translate, and proofread content — all **100% on-device** with zero data sent to external servers.

**But it's more than just a text transformer!** With the right custom instructions, promptLY can also:
- ✅ Answer questions in detail
- ✅ Solve problems step-by-step
- ✅ Draft professional emails
- ✅ Explain complex concepts simply
- ✅ And much more!

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
3. **Reply to Email** - Draft professional email responses *(Note: Works ~99% of the time; occasional edge cases may produce unexpected results)*
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

---

## 🛠️ Installation

### Prerequisites

You need **Google Chrome version 127 or higher**. Check your version:
- Click menu (⋮) → Help → About Google Chrome
- Should show version **127+** (current stable is 141+)

✅ **Works on Chrome Stable** - No need for Dev or Canary!

⚠️ **Internet Required:** Only for initial setup to download the AI model (~2GB). After that, works completely offline!

### Step 1: Enable Chrome's Built-in AI

1. **Enable Optimization Guide:**
   - Navigate to: `chrome://flags/#optimization-guide-on-device-model`
   - Select: **"Enabled BypassPerfRequirement"** from dropdown
   - This allows the AI model to run without strict performance checks

2. **Enable Prompt API:**
   - Navigate to: `chrome://flags/#prompt-api-for-gemini-nano`
   - Select: **"Enabled"** from dropdown
   - This activates the AI text generation capabilities

3. **Enable Summarization API** (Optional but recommended):
   - Navigate to: `chrome://flags/#summarization-api-for-gemini-nano`
   - Select: **"Enabled"** from dropdown

4. **Restart Chrome:**
   - Click the **"Relaunch"** button that appears at the bottom
   - Chrome will restart with AI features enabled

### Step 2: Verify AI Availability

1. Open **DevTools Console** (Press `F12` or `Ctrl+Shift+J` / `Cmd+Option+J`)
2. Run this command:
   ```javascript
   (await ai.languageModel.capabilities()).available;
   ```
3. **Expected Results:**
   - `"readily"` ✅ - AI is ready to use!
   - `"after-download"` ⏳ - Model is downloading (wait 5-10 minutes, then check again)
   - `"no"` ❌ - AI not available (check flags settings and Chrome version)

4. **If downloading:** The Gemini Nano model (~1.5-2GB) will download automatically. You can check progress:
   ```javascript
   await ai.languageModel.create();
   ```
   This will show download progress in the console.

### Step 3: Install promptLY Extension

**Option 1: From Chrome Web Store** *(Coming Soon)*
- Visit the Chrome Web Store listing
- Click **"Add to Chrome"**
- Click **"Add extension"** in the popup
- Done!

**Option 2: Manual Installation (Developer Mode)**

1. **Download the Extension:**
   - Clone this repository or download as ZIP
   ```bash
   git clone https://github.com/renukaKandii/promptly.git
   ```
   - Or download ZIP and extract it

2. **Open Chrome Extensions Page:**
   - Navigate to: `chrome://extensions/`
   - Or click: Menu (⋮) → Extensions → Manage Extensions

3. **Enable Developer Mode:**
   - Toggle the **"Developer mode"** switch in the top-right corner

4. **Load the Extension:**
   - Click **"Load unpacked"** button (top-left)
   - Select the `promptly` folder (the one containing `manifest.json`)
   - The extension will appear in your extensions list

5. **Pin to Toolbar (Optional but recommended):**
   - Click the puzzle piece icon (🧩) in your Chrome toolbar
   - Find "promptLY" in the list
   - Click the pin icon 📌 next to it
   - promptLY icon will now appear in your toolbar

### Step 4: Verify Installation

1. You should see the promptLY icon in your Chrome toolbar
2. Right-click on any text on a webpage
3. You should see **"promptLY"** in the context menu
4. Click it to open the side panel
5. If everything works, you're ready to go! 🎉

---

## 🎮 Usage

### Method 1: Right-Click Context Menu (Recommended)

Perfect for transforming text you find on websites:

1. **Select any text** on any webpage (emails, articles, documents, etc.)
2. **Right-click** on the selected text
3. Click **"promptLY"** from the context menu
4. The side panel opens with:
   - Your selected text in the **Input** field
   - Mode set to **"Rewrite"**
   - Tone set to **"Professional"**
5. (Optional) Change mode, tone, language, or add custom instructions
6. (Optional) Click a **Quick Prompt** for common transformations
7. Click **▶ Run**
8. Your transformed text appears in the **Output** section
9. Click **📋 Copy** to copy the result to clipboard

### Method 2: Direct Side Panel Use

Perfect for pasting content or writing from scratch:

1. Click the **promptLY icon** 🟣 in your Chrome toolbar
2. The side panel opens
3. **Paste or type** your text in the **Input** field
4. Select your desired **Mode** (Rewrite, Summarize, Translate, Proofread)
5. Choose your **Tone** (Professional, Casual, Curious, Poetic)
6. Select **Language** if translating (English, Español, 日本語)
7. (Optional) Click a **Quick Prompt** or write **Custom Instructions**
8. Click **▶ Run**
9. Review the output and click **📋 Copy** when satisfied

### Using Quick Prompts

Quick Prompts are one-click transformations:

1. Open promptLY (via toolbar icon or right-click)
2. Input or paste your text
3. Click any **Quick Prompt card** (Simplify, Elaborate, Reply to Email, Humanize)
   - The prompt automatically fills the Custom Instructions field
   - The card highlights with a blue border
4. Review the custom instruction (you can edit it!)
5. Click **▶ Run**

### Using Custom Instructions

For maximum flexibility:

1. Open promptLY
2. Input your text
3. Click the **Custom Instructions** textarea
4. Type your specific instruction, examples:
   - "Answer this question in detail with examples"
   - "Solve this math problem step-by-step"
   - "Rewrite as a LinkedIn post"
   - "Make this more persuasive for executives"
   - "Explain this to a 5-year-old"
5. Click **▶ Run**

### Managing History

promptLY automatically saves your last 10 transformations:

1. Scroll to the **Recent History** section at the bottom
2. Each history item shows:
   - Mode used (REWRITE, SUMMARIZE, etc.)
   - Time ago (just now, 5m ago, 1h ago, etc.)
   - Input preview (first 60 characters)
3. **Click any history item** to restore:
   - Input text
   - Mode
   - Tone
   - Language
   - Custom instructions
   - Previous output
4. Click **Clear All** to delete history

### Stopping a Generation

If you accidentally clicked Run or want to cancel:

1. While generating, the Run button becomes **⏹ Stop** (red)
2. Click **Stop** to signal cancellation
3. The AI will complete the current generation (cannot interrupt mid-stream)
4. Output will be discarded automatically
5. Controls re-enable immediately after completion

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
- Job applications responses
- Business correspondence
- Networking emails
- Customer service replies

**Important Note:** This works very reliably (~99% success rate), but occasionally the AI might misinterpret sender/recipient context in complex email threads. If the output addresses you instead of responding for you, simply click **▶ Run** again or add an explicit custom instruction like "I am replying to them."

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
- Download happens automatically on first use
- Takes 5-10 minutes depending on internet speed
- **After download, works completely offline!**
- Progress can be checked in DevTools console

**Language Support:**
- Currently limited to English, Spanish, Japanese
- Output may default to English even when other languages selected (working on fix)
- Translation quality varies by language pair

**Processing:**
- Cannot be interrupted mid-generation (Stop button waits for completion)
- Longer texts (>2000 words) may take 10-15 seconds
- Very complex custom instructions may produce unexpected results

### Email Reply Feature

**Success Rate: ~99%**

Occasionally (≈1% of cases) the AI may:
- Address you instead of the sender
- Misinterpret sender/recipient in complex email threads with multiple people
- Get confused by forwarded messages with nested quotes

**Workarounds:**
1. Click **▶ Run** again (often works on second try)
2. Add explicit instruction: "I am replying to them, not the other way around"
3. Manually edit the generated output
4. Use Custom Instructions instead of Quick Prompt

**When it works best:**
- Simple 1-on-1 email threads
- Clear sender/recipient context
- Standard business correspondence

### UI & Interaction

**Output Clearing:**
- Previous output is cleared when clicking Run
- This is intentional to avoid confusion, but means you can't compare results
- Use History feature to restore previous outputs

**History Limitations:**
- Limited to last 10 items (saves browser storage)
- No search or filter functionality
- Cleared when browser cache is cleared

**Visual Feedback:**
- Quick Prompt highlight only shows most recent selection
- Cleared when side panel closes
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
1. Open an [Issue](https://github.com/renukaKandii/promptly/issues) with the "feature request" label
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
- ❓ **Questions:** Feel free to open an issue with your question!

### Connect

- 📧 **Email:** knrenu4601@gmail.com
- 💼 **LinkedIn:** [Naga Renuka Kandi](https://www.linkedin.com/in/naga-renuka-kandi/)
- 🐙 **GitHub:** [@renukaKandii](https://github.com/renukaKandii)

### Response Time

Since this is a solo project:
- **Bugs:** I aim to respond within 2-3 days
- **Feature requests:** May take longer to evaluate
- **Pull requests:** Reviewed within a week

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

### General

**Q: Is promptLY really free?**
A: Yes! No subscriptions, no in-app purchases, no ads. Completely free and open source.

**Q: Does it work offline?**
A: Yes! After the initial model download (requires internet), all processing happens on your device offline. You only need internet once for setup.

**Q: What languages are supported?**
A: Currently English, Spanish (Español), and Japanese (日本語). More coming soon!

### Technical

**Q: Why do I need Chrome 127+?**
A: Chrome's built-in AI (Gemini Nano) was introduced in version 127. Earlier versions don't have the necessary AI capabilities.

**Q: How do I know if the AI model is ready?**
A: Run `(await ai.languageModel.capabilities()).available` in DevTools console. If it returns `"readily"`, you're good!

**Q: Can I use this on Firefox/Safari/Edge?**
A: No. Chrome's built-in AI is Chrome-specific. Other browsers may add similar features in the future.

**Q: Why is the model download so large?**
A: Gemini Nano is a powerful AI model that runs entirely on your device. The ~2GB size is necessary for its capabilities.

### Privacy

**Q: Is my text sent to any servers?**
A: No! All processing happens locally on your device. Zero data leaves your machine.

**Q: Can my employer/school see what I'm transforming?**
A: No. Unlike cloud AI tools, promptLY doesn't send data anywhere, so there's no server logs to monitor.

### Usage

**Q: Why didn't "Reply to Email" work correctly?**
A: In rare cases (~1%), the AI may misinterpret sender/recipient. Try clicking Run again or add explicit custom instruction.

**Q: Can I use this for work/commercial purposes?**
A: Yes! MIT License allows commercial use. However, always review AI outputs for professional contexts.

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

### Maximizing Output Quality

1. **Start with a good input** - AI can't fix unclear source material
2. **Use specific modes** - Summarize for long content, Rewrite for quality
3. **Iterate** - Run multiple times with tweaked instructions
4. **Compare outputs** - Use History to compare different approaches
5. **Edit the result** - AI gets you 80% there; polish the rest manually

### Productivity Hacks

**Quick Email Responses:**
1. Select the email you received
2. Right-click → promptLY
3. Click "Reply to Email"
4. Click Run → Copy → Send!

**Learning from Articles:**
1. Select a complex paragraph
2. Right-click → promptLY
3. Click "Simplify (ELI5)"
4. Understand easily!

---

<div align="center">

---

**Built with ❤️ and ☕ by Naga Renuka Kandi**

*Privacy-first • On-device • Open source*

---

⭐ **Star this repo if you find it useful!** ⭐

[Report Bug](https://github.com/renukaKandii/promptly/issues) • [Request Feature](https://github.com/renukaKandii/promptly/issues) • [Connect on LinkedIn](https://www.linkedin.com/in/naga-renuka-kandi/)

</div>