import { test } from '@playwright/test';
import { env } from '../../src/utils/env';
import { paths } from '../../src/utils/paths';

test('auth setup (creates storage state)', async ({ page }) => {
  await page.goto(env.baseUrl);
  await page.context().storageState({ path: paths.storageState });
});
