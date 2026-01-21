# Contributing

Thanks for your interest in contributing.

## Quick guidelines
- Keep changes small and focused per PR.
- Follow existing folder structure (`src/pages`, `src/fixtures`, `tests`, `docs`).
- Prefer stable Playwright locators: `getByRole`, `getByLabel`, `getByText`.
- Do not commit secrets or auth state:
  - Never commit `.env`
  - Never commit `.auth/storageState.json`

## Setup
```bash
npm install
npx playwright install
cp .env.example .env
Run checks locally
bash
Copy code
npm test
Adding a new Page Object
Create a page in src/pages/

Expose actions as methods (avoid test logic in pages)

Use BasePage helper methods where possible

Adding a new test
Add a spec under tests/

Use tags like @smoke and @regression

Keep tests independent and deterministic

Authenticated apps (optional)
Generate auth state:

bash
Copy code
npm run auth:setup
Run authenticated suite:

bash
Copy code
npm run test:auth
Submitting a Pull Request
Fork the repo

Create a branch: feature/<short-name>

Commit with a clear message

Open a PR describing what changed and why
