import { test, expect } from '../src/fixtures/test';

test.skip(true, 'Template test (external site). Enable after updating BASE_URL and locators.');

test('smoke: playwright.dev navigation', async ({ homePage, page }) => {
  await homePage.open();
  await homePage.goToGetStarted();
  await expect(page).toHaveURL(/.*\/docs\/intro/);
});
