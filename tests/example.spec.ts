import { test, expect } from '../src/fixtures/test';

test('smoke: playwright.dev navigation', async ({ homePage, page }) => {
  await homePage.open();
  await homePage.goToGetStarted();
  await expect(page).toHaveURL(/.*\/docs\/intro/);
});
