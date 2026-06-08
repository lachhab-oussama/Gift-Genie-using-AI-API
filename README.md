# 🧞 Gift Genie — AI-Powered Gift Suggestion App

Gift Genie is a full-stack web application that uses AI to generate personalized gift ideas. Describe who you're shopping for — their interests, the occasion, your budget, and any other details — and the Genie will suggest thoughtful, practical gift options in seconds.

![Gift Genie Screenshot](front-end/public/assets/genie.svg)

---

## ✨ Features

- **AI-Powered Suggestions** — Leverages an OpenAI-compatible API to generate context-aware gift ideas with structured Markdown output.
- **Flexible Provider Support** — Works with any AI provider that exposes an OpenAI-compatible chat completions endpoint (OpenAI, Groq, Ollama, etc.).
- **Server-Side Processing** — AI calls, Markdown rendering, and HTML sanitization all happen on the server — no API keys exposed to the browser.
- **React Component Architecture** — Modular, reusable components with co-located CSS (Header, GiftForm, LampButton, OutputDisplay).
- **"Mystic Bazaar" Dark UI** — A polished, atmospheric interface with golden amber accents, CSS particle animations, and a magic lamp theme.
- **Responsive Design** — Fully responsive from desktop to mobile with adaptive layout breakpoints.

---

## 🛠️ Tech Stack

| Layer      | Technology                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------- |
| Frontend   | [React 19](https://react.dev/) · [Vite 8](https://vitejs.dev/) · Vanilla CSS                      |
| Backend    | [Express 5](https://expressjs.com/) · [OpenAI JS SDK](https://github.com/openai/openai-node)      |
| AI / LLM   | Any OpenAI-compatible API (OpenAI, Groq, Ollama, etc.)                                            |
| Rendering  | [Marked](https://marked.js.org/) (Markdown → HTML) · [DOMPurify](https://github.com/cure53/DOMPurify) (XSS sanitization) |
| Typography | [Poppins](https://fonts.google.com/specimen/Poppins) via Google Fonts                              |

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

The project has two separate packages — one for the backend and one for the frontend. Install both:

```bash
# Backend
cd Server
npm install

# Frontend
cd ../front-end
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `Server/` directory:

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

### 4. Start the Application

#### Option A — One command (recommended)

Use the included `init.sh` script to install dependencies (if needed) and launch both servers at once:

```bash
chmod +x init.sh
./init.sh
```

Press `Ctrl+C` to stop both servers.

#### Option B — Manual (two terminals)

**Terminal 1 — Backend (port 3000):**

```bash
cd Server
npm start
```

**Terminal 2 — Frontend (port 5173):**

```bash
cd front-end
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📖 How to Use

1. **Open the app** in your browser at `http://localhost:5173`.
2. **Describe the person** you're shopping for in the text area — include details like their interests, the occasion, your budget, and your location.
3. **Click "Rub the Lamp"** 🪔 and wait for the Genie to work its magic.
4. **Browse the suggestions** that appear below the input area.

### Example Prompt

> *My friend who loves hip-hop music has a birthday coming up in 3 days. 40–60 bucks budget. I live in New York.*

---

## 🏗️ Architecture

```
Browser (React)  ──GET /api/gen-gift──▸  Express Server  ──▸  OpenAI-compatible API
                                              │
                                    Markdown → HTML (Marked)
                                    HTML sanitization (DOMPurify)
                                              │
                 ◂── { safeHTML } ────────────┘
```

The frontend sends the user's prompt to the Express backend. The server calls the configured AI provider, converts the Markdown response to HTML via `marked`, sanitizes it with `DOMPurify` (using `jsdom`), and returns clean HTML. The React frontend renders the sanitized output directly.

---

## 📁 Project Structure

```
Gift-Genie-using-AI-API/
├── Server/                          # Express backend
│   ├── server.js                    # Entry point — Express app setup
│   ├── Routes/
│   │   └── apiRoutes.js             # API route definitions
│   ├── Controllers/
│   │   └── messageStream.js         # Gift generation handler (AI call + render)
│   ├── Utils/
│   │   ├── InitializeAiProvider.js  # OpenAI client initialization
│   │   ├── checkEnvironment.js      # Env var validation on startup
│   │   └── systemMessage.js         # System prompt for the Gift Genie persona
│   ├── Reference.js                 # Standalone reference implementation
│   ├── package.json                 # Backend dependencies & scripts
│   └── .env                         # Environment variables (not committed)
│
├── front-end/                       # React + Vite frontend
│   ├── index.html                   # HTML shell (loads Poppins font)
│   ├── vite.config.js               # Vite configuration
│   ├── package.json                 # Frontend dependencies & scripts
│   ├── public/
│   │   └── assets/
│   │       ├── genie.svg            # Genie icon (header)
│   │       └── lamp.svg             # Magic lamp icon (button & favicon)
│   └── src/
│       ├── main.jsx                 # React entry point
│       ├── App.jsx                  # Root component — state & layout
│       ├── App.css                  # App layout styles
│       ├── index.css                # Global design system ("Mystic Bazaar")
│       └── components/
│           ├── Header/
│           │   ├── Header.jsx       # App title + genie icon
│           │   └── Header.css
│           ├── GiftForm/
│           │   ├── GiftForm.jsx     # Auto-resizing textarea input
│           │   └── GiftForm.css
│           ├── LampButton/
│           │   ├── LampButton.jsx   # Animated submit button with particles
│           │   └── LampButton.css
│           └── OutputDisplay/
│               ├── OutputDisplay.jsx # AI response renderer
│               └── OutputDisplay.css
│
├── .gitignore
├── init.sh
└── README.md
```

---

## 🔌 API Reference

### `GET /api/gen-gift`

Generates gift suggestions based on the user's prompt.

| Parameter    | Type   | Location | Required | Description                   |
| ------------ | ------ | -------- | -------- | ----------------------------- |
| `userPrompt` | string | query    | ✅       | Description of the gift recipient |

**Success Response** `200 OK`:

```json
{
  "safeHTML": "<h3>Gift Idea 1</h3><p>...</p>"
}
```

**Error Responses**:

- `400` — Missing `userPrompt` parameter
- `500` — AI provider error

---

## 📜 Available Scripts

### Backend (`Server/`)

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm start`     | Start the Express server on port 3000 |

### Frontend (`front-end/`)

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `npm run dev`      | Start the Vite development server          |
| `npm run build`    | Build for production into `dist/`          |
| `npm run preview`  | Preview the production build locally       |
| `npm run lint`     | Run ESLint checks                          |

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
