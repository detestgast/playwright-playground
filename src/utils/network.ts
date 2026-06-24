/**
 * Waits for the response of the address lookup API call to finish.
 * @param page The Playwright page object.
 */
export async function waitForAddressLookupResponse(page: any) {
  await page.waitForResponse(
    (response: any) => response.url().includes('/api/delanl/address/lookup') && response.status() === 200,
  );
}
