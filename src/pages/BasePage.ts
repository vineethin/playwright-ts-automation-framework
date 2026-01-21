import { Page, Locator, expect } from '@playwright/test';
import { env } from '../utils/env';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(urlOrPath: string) {
    const url = urlOrPath.startsWith('http')
      ? urlOrPath
      : `${env.baseUrl}${urlOrPath.startsWith('/') ? '' : '/'}${urlOrPath}`;

    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async waitForVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async click(locator: Locator) {
    await this.waitForVisible(locator);
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await this.waitForVisible(locator);
    await locator.fill(value);
  }
}
