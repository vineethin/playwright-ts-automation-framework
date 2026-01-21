# Playwright TypeScript Automation Framework (Starter)
![Playwright](https://img.shields.io/badge/Playwright-Test-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

A production-style **Playwright + TypeScript** automation framework designed to be reusable for **any web application** (including apps using **SSO**).

## Key Features
- Page Object Model (POM)
- Custom fixtures for dependency injection (page objects per test)
- Multi-browser execution (**chromium / firefox / webkit**)
- Tag-based runs (**smoke / regression**)
- HTML reporting + test artifacts (**screenshots / videos / traces**)
- Optional auth session reuse via **storageState**
- Works for **any BASE_URL** using `.env`

---

## Prerequisites
- Node.js LTS
- VS Code (recommended)
- Git (optional)

---

## Getting Started (30 seconds)

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
```

### 3) Run tests
```bash
npm test
```

### SSO Documentation
See: `docs/SSO.md`

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

tests/
  auth/         # Auth setup for storageState (optional)
  example.spec.ts

docs/
  SSO.md

playwright.config.ts
playwright.config.auth.ts
.env.example
.gitignore
README.md
```

---

## Authentication Support (Non-SSO and SSO)

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

---

## Contributing
Contributions are welcome.

1. Fork the repo
2. Create a feature branch
3. Submit a Pull Request

---

## License
MIT License
