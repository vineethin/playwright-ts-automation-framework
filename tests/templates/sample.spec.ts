import { test, expect } from '@playwright/test';
import { env } from '../../src/utils/env';

test.describe('@smoke Sample template', () => {
  test('should open the base URL and show the page title', async ({ page }) => {
    await page.goto(env.baseUrl);

    // Replace with something meaningful for your app
    await expect(page).toHaveTitle(/.+/);
  });
});
