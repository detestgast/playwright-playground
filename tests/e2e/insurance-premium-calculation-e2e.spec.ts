import { test, expect } from '../fixtures';
import { UitvaartverzekeringAfsluitenPage } from '../../pages/uitvaartverzekering-afsluiten-page';

test.describe('DELA uitvaartverzekering afsluiten', () => {
  test('should perform a premium calculation', async ({ page }) => {
    const calculator = new UitvaartverzekeringAfsluitenPage(page);
    await calculator.visit();
    await expect(calculator.mainContent).toMatchAriaSnapshot({ name: 'insurance-premium-calculation-step1-start.aria.yml' });

    await calculator.enterGeboortedatumAndContinue('01-01-1980');
    await expect(calculator.mainContent).toMatchAriaSnapshot({ name: 'insurance-premium-calculation-step1-choose-insurance.aria.yml' });
  });
});
