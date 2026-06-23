import { test, expect } from '../src/fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { adultFemale, adultMale } from './scenarios/funaral-insurance-adult';
import { formatDate } from '../src/utils/date';

test.describe('DELA uitvaartverzekering', () => {
  const testScenarios = [{ scenario: adultMale }, { scenario: adultFemale }];

  for (const { scenario } of testScenarios) {
    const { dateOfBirth } = scenario;
    const { duration, insuranceType, paymentFrequency } = scenario.insuranceOptions;

    test.describe(`adult ${scenario.firstName} ${scenario.lastName} choosing ${insuranceType}`, () => {
      test('should perform a premium calculation', async ({ uitvaartverzekeringAfsluitenPage }) => {
        await allure.step('Step 1 - Verzekering samenstellen', async () => {
          await allure.step('Visit insurance premium calculation page', async () => {
            await uitvaartverzekeringAfsluitenPage.visit();
            await expect(uitvaartverzekeringAfsluitenPage.mainContent).toMatchAriaSnapshot({
              name: 'insurance-premium-calculation-step1-start.aria.yml',
            });
          });

          await allure.step(`Enter date of birth ${formatDate(dateOfBirth)} and continue`, async () => {
            await uitvaartverzekeringAfsluitenPage.enterGeboortedatum(dateOfBirth);
            await uitvaartverzekeringAfsluitenPage.continueToNextStep();
            await expect(uitvaartverzekeringAfsluitenPage.mainContent).toMatchAriaSnapshot({
              name: 'insurance-premium-calculation-step1-choose-insurance.aria.yml',
            });
          });

          await allure.step(`Choose ${insuranceType} (${duration}, ${paymentFrequency})`, async () => {
            await uitvaartverzekeringAfsluitenPage.selectInsuranceOption(insuranceType);
            await uitvaartverzekeringAfsluitenPage.selectAmountOrAdditionalAmount(scenario);
            await uitvaartverzekeringAfsluitenPage.continueToNextStep();
            await uitvaartverzekeringAfsluitenPage.selectDuration(duration);
            await uitvaartverzekeringAfsluitenPage.selectPaymentFrequency(paymentFrequency);
            await uitvaartverzekeringAfsluitenPage.continueToNextStep();
          });
        });

        await allure.step('Step 2 - Persoonsgegevens', async () => {
          await uitvaartverzekeringAfsluitenPage.waitForTimeout(2000);
        });
      });
    });
  }
});
