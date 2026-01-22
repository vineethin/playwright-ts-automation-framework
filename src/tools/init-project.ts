import fs from 'fs';
import path from 'path';
import prompts from 'prompts';

const root = process.cwd();

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeFileSafe(filePath: string, content: string) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, { encoding: 'utf8' });
  console.log(`✔ Created: ${path.relative(root, filePath)}`);
}

async function main() {
  const answers = await prompts([
    {
      type: 'text',
      name: 'baseUrl',
      message: 'BASE_URL (e.g., https://your-app.com):',
      initial: 'https://playwright.dev',
      validate: (v: string) => (v?.startsWith('http') ? true : 'Enter a valid URL'),
    },
    {
      type: 'toggle',
      name: 'needsLogin',
      message: 'Does your app require login?',
      initial: false,
      active: 'yes',
      inactive: 'no',
    },
    {
      type: (prev: boolean) => (prev ? 'text' : null),
      name: 'loginPath',
      message: 'Login path (e.g., /login):',
      initial: '/login',
    },
    {
      type: (prev: any, values: any) => (values.needsLogin ? 'text' : null),
      name: 'usernameSelector',
      message: 'Username input selector (CSS or role/text-based is OK):',
      initial: '#username',
    },
    {
      type: (prev: any, values: any) => (values.needsLogin ? 'text' : null),
      name: 'passwordSelector',
      message: 'Password input selector:',
      initial: '#password',
    },
    {
      type: (prev: any, values: any) => (values.needsLogin ? 'text' : null),
      name: 'submitSelector',
      message: 'Submit button selector:',
      initial: 'button[type="submit"]',
    },
  ]);

  // Update .env.example (safe to commit)
  const envExamplePath = path.join(root, '.env.example');
  const envExample = `# Base URL for your app
BASE_URL=${answers.baseUrl}

# Optional (Non-SSO login)
USERNAME=
PASSWORD=

# Optional AI (experimental)
AI_ENABLED=false
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
`;
  writeFileSafe(envExamplePath, envExample);

  // LoginPage (only if login)
  if (answers.needsLogin) {
    const loginPagePath = path.join(root, 'src', 'pages', 'LoginPage.ts');
    const loginPage = `import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.locator('${answers.usernameSelector}');
    this.password = page.locator('${answers.passwordSelector}');
    this.submit = page.locator('${answers.submitSelector}');
  }

  async open(baseUrl: string) {
    await this.page.goto(\`\${baseUrl}${answers.loginPath}\`);
  }

  async login(username: string, password: string) {
    await this.fill(this.username, username);
    await this.fill(this.password, password);
    await this.click(this.submit);
  }
}
`;
    writeFileSafe(loginPagePath, loginPage);

    // Auth setup (headed, manual OK for SSO)
    const authSetupPath = path.join(root, 'tests', 'auth', 'auth.setup.spec.ts');
    const authSetup = `import { test } from '@playwright/test';
import { env } from '../../../src/utils/env';

test('auth setup (creates storage state)', async ({ page }) => {
  // For SSO/MFA: complete login manually in the headed run.
  // For non-SSO: implement login steps below (already scaffolded).

  await page.goto(env.baseUrl);

  // If non-SSO, you can uncomment and customize:
  // const username = env.username;
  // const password = env.password;
  // // TODO: navigate to login page and login

  await page.context().storageState({ path: '.auth/storageState.json' });
});
`;
    writeFileSafe(authSetupPath, authSetup);
  }

  // Smoke test (public pages)
  const smokePath = path.join(root, 'tests', 'smoke.spec.ts');
  const smoke = `import { test, expect } from '@playwright/test';
import { env } from '../src/utils/env';

test('smoke: homepage loads', async ({ page }) => {
  await page.goto(env.baseUrl);
  await expect(page).toHaveURL(/.*/);
});
`;
  writeFileSafe(smokePath, smoke);

  console.log('\nDone. Next: copy .env.example to .env and run npm test.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
