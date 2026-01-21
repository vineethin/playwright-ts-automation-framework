import { FullConfig } from '@playwright/test';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

async function globalSetup(_config: FullConfig) {
  const storageStatePath = path.join(process.cwd(), 'test-results', 'storageState.json');

  // If auth state already exists, skip re-login
  if (fs.existsSync(storageStatePath)) {
    return;
  }

  const cli = path.join(process.cwd(), 'node_modules', '@playwright', 'test', 'cli.js');

  execSync(
    `node "${cli}" test -c playwright.auth.config.ts "tests/auth/auth.setup.spec.ts"`,
    { stdio: 'inherit' }
  );
}

export default globalSetup;
