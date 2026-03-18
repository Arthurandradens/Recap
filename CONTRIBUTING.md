# Contributing to PR Resume

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm
- A GitHub account
- API keys (see [docs/setup.md](docs/setup.md))

### Local Development

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/pullrequest-resume.git
cd pullrequest-resume

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

## How to Contribute

### Reporting Bugs

1. Check if the issue already exists in [GitHub Issues](https://github.com/your-username/pullrequest-resume/issues)
2. If not, open a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Suggesting Features

Open a [GitHub Issue](https://github.com/your-username/pullrequest-resume/issues) with the `enhancement` label describing:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

### Submitting Code

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Ensure the build passes: `npm run build`
5. Ensure linting passes: `npm run lint`
6. Commit with a clear message
7. Push to your fork and open a Pull Request

### Pull Request Guidelines

- Keep PRs focused on a single change
- Update documentation if needed
- Add a clear description of what changed and why
- Reference related issues using `Closes #123`

## Project Structure

```
src/
  app/                    # Next.js App Router pages and API routes
    api/
      config/route.ts     # Config validation endpoint
      summary/route.ts    # Main summary endpoint
    config/page.tsx       # Settings page
    page.tsx              # Dashboard (main page)
  components/             # React components
    DatePicker.tsx
    SummaryCard.tsx
    DailySuggestionCard.tsx
    RelevanceScore.tsx
    PRList.tsx
    CommitList.tsx
    StatsBar.tsx
    LoadingSkeleton.tsx
    ErrorDisplay.tsx
  lib/                    # Core logic
    config.ts             # Environment variable management
    db.ts                 # SQLite cache layer
    errors.ts             # Error handling
    github.ts             # GitHub API integration
    openai.ts             # OpenAI API integration
    types.ts              # TypeScript interfaces
```

## Code Style

- TypeScript strict mode
- ESLint with Next.js config
- Functional components with hooks
- Tailwind CSS for styling

## License

By contributing, you agree that your contributions will be licensed under the [AGPL-3.0 License](LICENSE).
