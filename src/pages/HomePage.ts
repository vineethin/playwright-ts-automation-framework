import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly navGetStarted: Locator;

  constructor(page: Page) {
    super(page);
    this.navGetStarted = page.getByRole('link', { name: 'Get started' });
  }

  async open() {
    await this.goto('/');
  }

  async goToGetStarted() {
    await this.click(this.navGetStarted);
  }
}
