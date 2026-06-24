import { Locator, Page } from '@playwright/test';

/**
 * Base class for all page objects. Provides common navigation and cookie
 * consent helpers that are shared across pages.
 */
export class BasePage {
  /** Locator for the "Alle cookies accepteren" button in the cookie consent banner. */
  readonly acceptAllCookiesBtn: Locator;

  /**
   * @param page - The Playwright {@link Page} instance for this page object.
   */
  constructor(protected readonly page: Page) {
    this.acceptAllCookiesBtn = page.getByRole('button', { name: /Alle cookies accepteren/i });
  }

  /**
   * Navigates to the given URL and waits until the network is idle.
   *
   * @param url - The URL to navigate to.
   */
  async navigate(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Accepts all cookies by clicking the consent banner button, but only if
   * the button is currently visible. Safe to call unconditionally.
   */
  async acceptAllCookiesIfVisible() {
    if (await this.acceptAllCookiesBtn.isVisible()) {
      await this.acceptAllCookiesBtn.click();
    }
  }

  /**
   * Pauses execution for the specified duration.
   *
   * @param timeout - Time to wait in milliseconds.
   *
   * @remarks Prefer explicit assertions or `waitForSelector` over fixed
   * timeouts where possible.
   */
  async waitForTimeout(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }
}
