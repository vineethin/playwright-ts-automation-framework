# Start Here (New Users)

This repo is a starter Playwright + TypeScript automation framework.

## Recommended setup steps
1) Create a new repo from this template (GitHub → **Use this template**)
2) Install dependencies:
```bash
npm install
npx playwright install
Configure .env:

bash
Copy code
cp .env.example .env
Set:

BASE_URL

USERNAME / PASSWORD (if non-SSO)

Run tests:

bash
Copy code
npm test
If your app needs login
Non-SSO: implement steps in tests/auth/auth.setup.spec.ts

SSO: follow docs/SSO.md

Run:

bash
Copy code
npm run auth:setup
npm run test:auth
Where to add your code
Page objects: src/pages/

Tests: tests/

Utilities: src/utils/
