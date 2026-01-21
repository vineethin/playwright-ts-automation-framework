👉 New here? Start with: [docs/START_HERE.md](./docs/START_HERE.md)

# Playwright TypeScript Automation Framework (Starter)

[![CI](https://github.com/vineethin/playwright-ts-automation-framework/actions/workflows/ci.yml/badge.svg)](https://github.com/vineethin/playwright-ts-automation-framework/actions/workflows/ci.yml)
![Playwright](https://img.shields.io/badge/Playwright-Test-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

A production-style **Playwright + TypeScript** automation framework designed to be reusable for **any web application** (including apps using **SSO**).

---

## Key Features

- Page Object Model (POM)
- Custom fixtures for dependency injection (page objects per test)
- Multi-browser execution (**chromium / firefox / webkit**)
- Tag-based runs (**smoke / regression**)
- HTML reporting + test artifacts (**screenshots / videos / traces**)
- Optional auth session reuse via **storageState**
- Works for **any BASE_URL** using `.env`

---

## Getting Started (30 seconds)

### Use as a Template (Recommended)

Click **Use this template** on GitHub to generate a new repo for your application, then run:

```bash
npm install
cp .env.example .env
npm test
```

---

## Prerequisites

- Node.js LTS
- VS Code (recommended)
- Git (optional)

---

## Quick Start

### 1) Install dependencies

```bash
npm install
npx playwright install
```

### 2) Configure environment variables

Create your local `.env` file from the example:

```bash
cp .env.example .env
```

Update `.env`:

```env
BASE_URL=https://your-app-url.com
USERNAME=
PASSWORD=
AI_ENABLED=false
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

### 3) Run tests

```bash
npm test
```

Open HTML report:

```bash
npm run report
```

---

## AI Demo (Optional)

Generate stable locator suggestions (JSON output):

```bash
npm run ai:locators -- https://playwright.dev "get started link"
```

> AI is **disabled by default**. To enable it locally, set `AI_ENABLED=true` and add your `OPENAI_API_KEY` in `.env`.
> Never commit real secrets to Git.

---

## Optional: Authenticated Mode (Non-SSO / SSO)

This framework supports optional login session reuse using Playwright **storageState**.

### Public apps (no login)

```bash
npm test
```

### Authenticated apps (Non-SSO or SSO)

#### 1) Generate auth state once (headed)

```bash
npm run auth:setup
```

#### 2) Run tests using the authenticated configuration

```bash
npm run test:auth
```

Auth state is stored at:

```text
.auth/storageState.json
```

Important:

- Do NOT commit `.auth/storageState.json` to Git
- Treat it like a password/session cookie

SSO Documentation: see **docs/SSO.md**

---

## NPM Scripts

Run full suite:

```bash
npm test
```

Run smoke tests:

```bash
npm run test:smoke
```

Run regression tests:

```bash
npm run test:regression
```

Run headed mode:

```bash
npm run test:headed
```

Run debug mode:

```bash
npm run test:debug
```

Run in a single browser:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

Run auth setup (headed):

```bash
npm run auth:setup
```

Run authenticated tests:

```bash
npm run test:auth
```

Open report:

```bash
npm run report
```

---

## Project Structure

```text
src/
  pages/        # Page Objects (POM)
  fixtures/     # Custom Playwright fixtures
  utils/        # Env/config helpers
  tools/        # CLI tools (optional)

tests/
  auth/         # Auth setup for storageState (optional)
  example.spec.ts

docs/
  START_HERE.md
  SSO.md

playwright.config.ts
playwright.config.auth.ts
.env.example
.gitignore
README.md
```

---

## CI (GitHub Actions)

This repo includes a GitHub Actions workflow that runs tests on every push and pull request.

Workflow file:

- `.github/workflows/ci.yml`

Notes:

- CI runs in **public mode** by default (no login required)
- Authenticated/SSO flows should be tested locally using:
  - `npm run auth:setup`
  - `npm run test:auth`

---

## FAQ / Troubleshooting

### 1) I see "No tests found"

Make sure your test file name ends with:

- `.spec.ts`

Example:

- `tests/login.spec.ts`

### 2) My auth tests fail with missing storageState.json

Run auth setup first:

```bash
npm run auth:setup
npm run test:auth
```

### 3) CI fails but local passes

CI runs in Linux and headless mode. Try:

```bash
npx playwright test --headed
```

Also prefer stable locators:

- `getByRole`
- `getByLabel`
- `getByText`

### 4) SSO requires MFA

Use manual login once:

```bash
npm run auth:setup
npm run test:auth
```

See: `docs/SSO.md`

---

## Contributing

Contributions are welcome.

1. Fork the repo
2. Create a feature branch
3. Submit a Pull Request

---

## License

MIT License
