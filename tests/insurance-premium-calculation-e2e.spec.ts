import { test, expect } from '../src/fixtures/fixtures';

test.describe('DELA uitvaartverzekering afsluiten', () => {
  test('should perform a premium calculation', async ({ uitvaartverzekeringAfsluitenPage }) => {
    await uitvaartverzekeringAfsluitenPage.visit();
    await expect(uitvaartverzekeringAfsluitenPage.mainContent).toMatchAriaSnapshot({
      name: 'insurance-premium-calculation-step1-start.aria.yml',
    });

    await uitvaartverzekeringAfsluitenPage.enterGeboortedatumAndContinue('01-01-1980');
    await expect(uitvaartverzekeringAfsluitenPage.mainContent).toMatchAriaSnapshot({
      name: 'insurance-premium-calculation-step1-choose-insurance.aria.yml',
    });

    await uitvaartverzekeringAfsluitenPage.selectInsuranceOption('geldverzekering');
    await expect(uitvaartverzekeringAfsluitenPage.mainContent).toMatchAriaSnapshot({
      name: 'insurance-premium-calculation-step1-choose-amount.aria.yml',
    });

    await uitvaartverzekeringAfsluitenPage.waitForTimeout(2000);
  });
});
