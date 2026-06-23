import { test, expect } from '../src/fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { adultFemale, adultMale } from './scenarios/funaral-insurance-adult';
import { formatDate } from '../src/utils/date';

test.describe('DELA uitvaartverzekering', () => {
  const testScenarios = [{ scenario: adultMale }, { scenario: adultFemale }];

  for (const { scenario } of testScenarios) {
    test.describe(`${scenario.gender} adult person ${scenario.firstName} ${scenario.lastName} choosing ${scenario.insuranceOptions.insuranceType}`, () => {
      test('should perform a premium calculation', async ({ uitvaartverzekeringAfsluitenPage }) => {
        await allure.step('Visit insurance premium calculation page', async () => {
          await uitvaartverzekeringAfsluitenPage.visit();
          await expect(uitvaartverzekeringAfsluitenPage.mainContent).toMatchAriaSnapshot({
            name: 'insurance-premium-calculation-step1-start.aria.yml',
          });
        });

        await allure.step(`Enter date of birth ${formatDate(scenario.dateOfBirth)} and continue`, async () => {
          await uitvaartverzekeringAfsluitenPage.enterGeboortedatum(scenario.dateOfBirth);
          await uitvaartverzekeringAfsluitenPage.continueToNextStep();
          await expect(uitvaartverzekeringAfsluitenPage.mainContent).toMatchAriaSnapshot({
            name: 'insurance-premium-calculation-step1-choose-insurance.aria.yml',
          });
        });

        await allure.step(`Select insurance type ${scenario.insuranceOptions.insuranceType}`, async () => {
          await uitvaartverzekeringAfsluitenPage.selectInsuranceOption(scenario.insuranceOptions.insuranceType);
          await uitvaartverzekeringAfsluitenPage.selectAmountOrAdditionalAmount(scenario);
          await uitvaartverzekeringAfsluitenPage.continueToNextStep();
          await uitvaartverzekeringAfsluitenPage.selectDuration(scenario.insuranceOptions.duration);
        });

        await uitvaartverzekeringAfsluitenPage.waitForTimeout(2000);
      });
    });
  }
});
