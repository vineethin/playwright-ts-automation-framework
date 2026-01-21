import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,

  //globalSetup: require.resolve('./tests/global-setup'),

  outputDir: 'test-results',

  reporter: [['html', { open: 'never', outputFolder: 'playwright-report' }]],

  use: {
    headless: true,
    //storageState: 'test-results/storageState.json',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
