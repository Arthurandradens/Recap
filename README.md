# PR Resume

AI-powered daily summaries of your GitHub repository activity. Know what your team shipped today, get ready for your daily standup, and track the impact of each day's work.

![License](https://img.shields.io/badge/license-AGPL--3.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## Features

- **Daily Summary** — AI-generated overview of merged PRs and commits, grouped by feature area
- **Daily Standup Suggestion** — Ready-to-use talking points for your daily meeting
- **Relevance Score** — 1-10 impact score so you know how productive the day was
- **Smart Caching** — SQLite cache prevents redundant API calls
- **Markdown Rendering** — Clean, readable output formatted in Portuguese (BR)
- **Date Navigation** — Browse summaries for any date

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A [GitHub Personal Access Token](https://github.com/settings/tokens)
- An [OpenAI API Key](https://platform.openai.com/api-keys)

### Installation

```bash
git clone https://github.com/your-username/pullrequest-resume.git
cd pullrequest-resume
npm install
```

### Configuration

```bash
cp .env.example .env.local
```

Edit `.env.local` with your keys:

```env
GITHUB_TOKEN=ghp_your_token_here
GITHUB_OWNER=your-org-or-username
GITHUB_REPO=your-repo-name
OPENAI_API_KEY=sk-your_key_here
```

> Need help getting API keys? See the [Setup Guide](docs/setup.md).

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docker

```bash
cp .env.example .env.local
# Edit .env.local with your keys

docker compose up -d
```

See [Self-Hosting Guide](docs/self-hosting.md) for more options (PM2, Vercel, Nginx reverse proxy).

## How It Works

1. Fetches merged Pull Requests and commits from GitHub for a given date
2. Sends the data to GPT-4o-mini with a structured prompt
3. Returns a JSON response with:
   - **Summary** — Markdown overview of the day's work
   - **Daily Suggestion** — Bullet points for your standup
   - **Relevance Score** — 1-10 impact rating with justification
4. Caches the result in SQLite so subsequent requests are instant

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| AI | OpenAI GPT-4o-mini |
| GitHub | Octokit |
| Database | SQLite (better-sqlite3) |
| Markdown | react-markdown |

## Project Structure

```
src/
  app/                    # Pages and API routes
    api/summary/route.ts  # Main endpoint
    page.tsx              # Dashboard
    config/page.tsx       # Settings
  components/             # UI components
  lib/                    # Core logic (GitHub, OpenAI, DB, types)
```

## Self-hosted vs Cloud

| | Self-hosted (this repo) | Cloud (coming soon) |
|---|---|---|
| **Cost** | Your own API keys | Monthly subscription |
| **Repos** | 1 per instance | Unlimited |
| **Infra** | You manage | We manage |
| **Data** | On your server | Cloud hosted |
| **Setup** | 5 minutes | Login with GitHub |

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the [AGPL-3.0 License](LICENSE). You are free to use, modify, and self-host it. If you modify and host it as a service, you must make your changes available under the same license.
