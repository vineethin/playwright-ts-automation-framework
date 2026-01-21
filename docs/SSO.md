# SSO Guide (Okta / Azure AD / Google) for Playwright storageState

This framework supports Single Sign-On (SSO) applications by reusing an authenticated browser session via Playwright `storageState`.

## What is storageState?
Playwright can save the browser context state (cookies + localStorage) to a file:
- `test-results/storageState.json`

If your tests use:
- `use.storageState = 'test-results/storageState.json'`

then they start already authenticated (no login needed per test).

---

## Recommended Strategy
SSO flows vary. The most reliable approach is:

1) Run a one-time login in headed mode (you complete SSO/MFA manually if required)
2) Save storageState to `test-results/storageState.json`
3) Run the full suite headless using the stored session

---

## Option A (Most Common): One-time headed login + reuse
Use this when your SSO requires MFA or an interactive approval step.

### 1) Implement navigation to your app sign-in page
Edit:
- `tests/auth/auth.setup.spec.ts`

Add steps to reach the SSO login page (app-specific).

### 2) Run auth setup headed (manual SSO)
```bash
npx playwright test "tests/auth/auth.setup.spec.ts" --headed
