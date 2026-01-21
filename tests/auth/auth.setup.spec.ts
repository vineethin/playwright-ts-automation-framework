import { test } from '@playwright/test';
import { env } from '../../src/utils/env';

test('auth setup (creates storage state)', async ({ page }) => {
  // TODO: Replace with your app login steps
  // Example:
  // await page.goto(`${env.baseUrl}/login`);
  // await page.fill('#username', env.username);
  // await page.fill('#password', env.password);
  // await page.click('button[type="submit"]');
  // await page.waitForURL('**/dashboard');

  // Temporary placeholder so the file runs without failing:
  await page.goto(env.baseUrl);

  await page.context().storageState({ path: 'test-results/storageState.json' });
});
