# Email Classification App

An intelligent email management application that fetches Gmail emails and classifies them using Google Gemini AI.

## Features

- 🔐 Google OAuth authentication
- 📧 Fetch emails from Gmail
- 🤖 AI-powered email classification using Gemini 2.0 Flash
- 🎨 Color-coded categories (Important, Promotions, Social, Marketing, Spam, General)
- 📱 Split-view interface for email reading

## Tech Stack

### Frontend
- React + TypeScript
- Vite
- TailwindCSS
- React Query
- React Router

### Backend
- Node.js + Express
- MongoDB
- Better Auth
- LangChain + Google Gemini AI
- Gmail API

## Setup

### Prerequisites
- Node.js >= 22.14.0
- MongoDB
- Google Cloud Project with Gmail API enabled
- Gemini API key
- pnpm (recommended) or npm

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
# Using pnpm (recommended)
pnpm install

# OR using npm
npm install
```

3. Create `.env` file in the backend directory:
```bash
touch .env
```

4. Add environment variables to `.env` (contents will be shared via email)

5. Start the backend server:
```bash
# Using pnpm
pnpm dev

# OR using npm
npm run dev
```

Backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
# Using pnpm (recommended)
pnpm install

# OR using npm
npm install
```

3. Create `.env` file in the frontend directory:
```bash
touch .env
```

4. Add environment variables to `.env` (contents will be shared via email)

5. Start the frontend server:
```bash
# Using pnpm
pnpm dev

# OR using npm
npm run dev
```

Frontend will run on `http://localhost:5173`

## Usage
**IMPORTANT**: After Google OAuth redirects you, manually change the port in the URL from `8000` to `5173` in your browser address bar please
1. Open the app at `http://localhost:5173`
2. Click "Sign in with Google"
3. **IMPORTANT**: After Google OAuth redirects you, manually change the port in the URL from `8000` to `5173` in your browser address bar
4. Enter your Gemini API key on the login page
5. View your emails and click "Classify" to categorize them

## Known Issues

- After Google OAuth sign-in, you need to manually change the port from 8000 to 5173 in the browser URL due to a callback configuration issue

## Email Categories

- **Important** (Green): Critical emails requiring attention
- **Promotions** (Purple): Marketing and promotional content
- **Social** (Blue): Social media notifications
- **Marketing** (Orange): Marketing campaigns
- **Spam** (Red): Unwanted emails
- **General** (Gray): Uncategorized emails

## License

MIT
