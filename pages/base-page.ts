import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly acceptAllCookiesBtn: Locator;

  constructor(protected readonly page: Page) {
    // Locators (that could exist on any page)
    this.acceptAllCookiesBtn = page.getByRole('button', { name: /Alle cookies accepteren/i });
  }

  async navigate(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async acceptAllCookiesIfVisible() {
    if (await this.acceptAllCookiesBtn.isVisible()) {
      await this.acceptAllCookiesBtn.click();
    }
  }
}
