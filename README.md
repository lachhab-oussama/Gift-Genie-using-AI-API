# 🧞 Gift Genie — AI-Powered Gift Suggestion App

Gift Genie is a web application that uses AI to generate personalized gift ideas. Describe who you're shopping for — their interests, the occasion, your budget, and any other details — and the Genie will suggest thoughtful, practical gift options in seconds.

![Gift Genie Screenshot](assets/genie.svg)

---

## ✨ Features

- **AI-Powered Suggestions** — Leverages an OpenAI-compatible API to generate context-aware gift ideas.
- **Flexible Provider Support** — Works with any AI provider that exposes an OpenAI-compatible chat completions endpoint (OpenAI, Anthropic via proxy, Groq, Ollama, etc.).
- **Beautiful Dark UI** — A polished, responsive interface with animated interactions and a magic lamp theme.
- **Fast & Lightweight** — Built with vanilla HTML/CSS/JS and bundled with Vite for instant hot-reload during development.

---

## 🛠️ Tech Stack

| Layer       | Technology                       |
| ----------- | -------------------------------- |
| Frontend    | HTML, CSS, JavaScript (ES Modules) |
| AI Client   | [OpenAI JS SDK](https://github.com/openai/openai-node) (`openai`) |
| Build Tool  | [Vite](https://vitejs.dev/)      |
| Env Config  | `dotenv` (loaded via Vite)       |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** (comes with Node.js)
- An **API key** from an OpenAI-compatible AI provider

### 1. Clone the Repository

```bash
git clone https://github.com/lachhab-oussama/Gift-Genie-using-AI-API.git
cd Gift-Genie-using-AI-API
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root with the following variables:

```env
AI_KEY=your-api-key-here
AI_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
```

| Variable   | Description                                                                 |
| ---------- | --------------------------------------------------------------------------- |
| `AI_KEY`   | Your API key for the AI provider                                            |
| `AI_URL`   | Base URL of the AI provider's API (e.g. `https://api.openai.com/v1`)        |
| `AI_MODEL` | The model to use for chat completions (e.g. `gpt-4o-mini`, `llama3`, etc.)  |

> **⚠️ Important:** The `.env` file is listed in `.gitignore` — your API key will **not** be committed to version control.

#### Example Configurations

<details>
<summary>OpenAI</summary>

```env
AI_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
AI_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
```
</details>

<details>
<summary>Groq</summary>

```env
AI_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx
AI_URL=https://api.groq.com/openai/v1
AI_MODEL=llama-3.3-70b-versatile
```
</details>

<details>
<summary>Ollama (local)</summary>

```env
AI_KEY=ollama
AI_URL=http://localhost:11434/v1
AI_MODEL=llama3
```
</details>

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173** (default Vite port).

---

## 📖 How to Use

1. **Open the app** in your browser.
2. **Describe the person** you're shopping for in the text area — include details like their interests, the occasion, your budget, and your location.
3. **Click "Rub the Lamp"** 🪔 and wait for the Genie to work its magic.
4. **Browse the suggestions** that appear below the lamp.

### Example Prompt

> *My friend who loves hip-hop music has a birthday coming up in 3 days. 40–60 bucks budget. I live in New York.*

---

## 📁 Project Structure

```
Gift-Genie-using-AI-API/
├── assets/
│   ├── genie.svg          # Genie icon used in the header
│   └── lamp.svg           # Magic lamp button icon
├── index.html             # Main HTML page
├── index.js               # App logic — AI client setup & form handling
├── utils.js               # Utility functions (textarea resize, loading state, env check)
├── style.css              # Full application styles (dark theme, animations)
├── vite.config.js         # Vite config — injects env vars into the browser
├── package.json           # Dependencies & scripts
├── .env                   # Environment variables (not committed)
└── .gitignore             # Git ignore rules
```

---

## 📜 Available Scripts

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `npm run dev`      | Start the Vite development server          |
| `npm start`        | Alias for `npm run dev`                    |
| `npm run build`    | Build for production into `dist/`          |
| `npm run preview`  | Preview the production build locally       |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "Add my feature"`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source. Feel free to use and modify it for your own purposes.
