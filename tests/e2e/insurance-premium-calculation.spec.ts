import { test, expect, Page } from '@playwright/test';

test.describe('DELA insurance - premium calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  async function acceptCookiesIfPresent(page: Page) {
    try {
      const cookieBanner = page.getByRole('dialog', { name: /cookies/i });
      if (await cookieBanner.isVisible({ timeout: 5000 })) {
        await cookieBanner.getByRole('button', { name: /alle cookies accepteren/i }).click();
        return;
      }
      return;
    } catch {}
  }

  test('Happy path', async ({ page }) => {
    await acceptCookiesIfPresent(page);

    const startLink = page.getByRole('link', { name: /bereken je premie in 1 minuut/i });
    await expect(startLink).toBeVisible();
  });
});
