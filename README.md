# Playwright TypeScript Automation Framework (Starter)

A production-style **Playwright + TypeScript** automation framework designed to be reusable for **any web application** (including apps using **SSO**).

## Key Features

* Page Object Model (POM)
* Custom fixtures for dependency injection (page objects per test)
* Multi-browser execution (**chromium / firefox / webkit**)
* Tag-based runs (**smoke / regression**)
* HTML reporting + test artifacts (**screenshots / videos / traces**)
* Optional auth session reuse via **storageState**
* Works for **any BASE_URL** using `.env`

---

## Prerequisites

* Node.js LTS
* VS Code (recommended)
* Git (optional, for version control)

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
```

### 3) Run tests

Run all tests:

```bash
npx playwright test
```

Open HTML report:

```bash
npm run report
```

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

---

## Project Structure

```text
src/
  pages/        # Page Objects (POM)
  fixtures/     # Custom Playwright fixtures
  utils/        # Env/config helpers

tests/
  auth/         # Optional auth setup for storageState
  example.spec.ts

playwright.config.ts
playwright.config.auth.ts
.env.example
.gitignore
README.md
```

---

## How to Use This Framework for Any Application URL

### Step 1: Set your application URL

Update `.env`:

```env
BASE_URL=https://your-app-url.com
```

### Step 2: Create page objects

Add page objects under:

```text
src/pages/
```

Example:

* `LoginPage.ts`
* `DashboardPage.ts`
* `SettingsPage.ts`

### Step 3: Write tests

Add tests under:

```text
tests/
```

### Step 4: Use stable locators (recommended)

For long-term stability, prefer:

* `getByRole()`
* `getByLabel()`
* `getByText()`

Example:

```ts
page.getByRole('button', { name: 'Sign in' })
```

---

## Reporting & Test Artifacts

This framework stores artifacts automatically:

* HTML Report → `playwright-report/`
* Screenshots / Videos / Traces → `test-results/`

Open report:

```bash
npx playwright show-report
```

---

## Authentication Support (Non-SSO and SSO)

This framework supports optional login session reuse using Playwright **storageState**.

## Running Tests: Public vs Authenticated

### Public apps (no login)

Run normally:

```bash
npx playwright test
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

* Do NOT commit `.auth/storageState.json` to Git
* Treat it like a password/session cookie

---

## Non-SSO (Username/Password Login)

If your application has a normal login page:

1. Update `.env` with `USERNAME` and `PASSWORD`
2. Implement the login steps inside:

```text
tests/auth/auth.setup.spec.ts
```

---

## SSO Support (Okta / Azure AD / Google SSO)

### Option 1 (Recommended): One-time manual SSO login (headed)

Use this when your SSO requires MFA or interactive approval.

1. Run auth setup in headed mode:

```bash
npm run auth:setup
```

2. Complete SSO login manually once

3. Run authenticated tests:

```bash
npm run test:auth
```

### Option 2: Fully automated SSO (when possible)

Use this when:

* MFA is disabled for the test account, OR
* your IdP supports automation for test environments

Implement the SSO steps in:

```text
tests/auth/auth.setup.spec.ts
```

Then run:

```bash
npm run auth:setup
npm run test:auth
```

---

## Contributing

Contributions are welcome.

Typical workflow:

1. Fork the repo
2. Create a feature branch
3. Submit a Pull Request

---

## License

MIT License
