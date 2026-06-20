import { test } from '../fixtures';
import { UitvaartverzekeringAfsluitenPage } from '../../pages/uitvaartverzekering-afsluiten-page';

test.describe('DELA uitvaartverzekering afsluiten', () => {
  test('should perform a premium calculation', async ({ basePage, page }) => {
    const calculator = new UitvaartverzekeringAfsluitenPage(page);
    await calculator.visit();

    await calculator.enterGeboortedatumAndContinue('01-01-1980');
  });
});
