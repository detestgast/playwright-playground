import { INSURANCE_TYPE } from '../src/consts/insuranceTypes';
import { test, expect } from '../src/fixtures/fixtures';
import { DURATION_TO_API, PAYMENT_FREQUENCY_TO_API } from '../src/utils/api';
import { apiDate } from '../src/utils/date';
import { adultMale } from './scenarios/funaral-insurance-adult';

const CHILD_COVER = false;

let INKIND_COVER: boolean;
switch (adultMale.insuranceOptions.insuranceType as string) {
  case INSURANCE_TYPE.MONEY:
    INKIND_COVER = false;
    break;
  case INSURANCE_TYPE.INKIND:
    INKIND_COVER = true;
    break;
  default:
    throw new Error(`Unknown insuranceType: ${adultMale.insuranceOptions.insuranceType}`);
}

test.describe('Public API Premium Calculation', () => {
  test('Calculate premium for adult male money insurance via calculate-premium-dup', async ({ page }) => {
    // Navigate to the calculator page so Cloudflare issues a clearance cookie for this browser session.
    // The API returns 403 to non-browser HTTP clients (Node.js fetch / APIRequestContext) because
    // Cloudflare Bot Management validates the TLS fingerprint in addition to the clearance cookie.
    // Using the browser's native fetch() is the only way to pass the Cloudflare check without UI interaction.
    await page.goto('/verzekeringen/uitvaartverzekering/uitvaartverzekering-afsluiten');

    const { dateOfBirth, insuranceOptions } = adultMale;
    const { duration, paymentFrequency, insuredAmount, insuranceType } = insuranceOptions;

    const payload = {
      policyStartDate: apiDate(insuranceOptions.startDate),
      premiumDuration: DURATION_TO_API[duration],
      paymentFrequency: PAYMENT_FREQUENCY_TO_API[paymentFrequency],
      dateOfBirth: apiDate(dateOfBirth),
      childCover: CHILD_COVER,
      insuredCapital: insuredAmount,
      inKindCover: INKIND_COVER,
    };

    // Send POST via the browser's native fetch so Chrome's TLS stack is used (required by Cloudflare).
    const result = await page.evaluate(async (data) => {
      const res = await fetch('/api/delanl/calculate-premium-dup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      return { status: res.status, ok: res.ok, body };
    }, payload);

    // HTTP status is successful (2xx)
    expect(result.status, `API returned ${result.status}: ${JSON.stringify(result.body)}`).toBeLessThan(300);

    // Response is JSON and contains all expected echoed fields
    expect(result.body).toMatchObject({
      premiumDuration: DURATION_TO_API[duration],
      paymentFrequency: PAYMENT_FREQUENCY_TO_API[paymentFrequency],
      insuredCapital: insuredAmount,
      inKindCover: INKIND_COVER,
      childCover: CHILD_COVER,
    });

    // Response contains premium as a positive numeric value
    expect(typeof result.body.premium).toBe('number');
    expect(result.body.premium).toBeGreaterThan(0);
  });
});
