import * as allure from 'allure-js-commons';
import { test, expect } from '../src/fixtures/fixtures';
import { formatDate } from '../src/utils/date';
import { adultFemale, adultMale } from './scenarios/funaral-insurance-adult';

test.describe('DELA uitvaartverzekering', () => {
  const testScenarios = [{ scenario: adultMale }, { scenario: adultFemale }];

  for (const { scenario } of testScenarios) {
    const { dateOfBirth, gender, initials, lastName } = scenario;
    const { zipCode, houseNumber } = scenario.addressDetails;
    const { telephoneNumber, emailAddress } = scenario.contactDetails;
    const { duration, insuranceType, paymentFrequency } = scenario.insuranceOptions;

    test.describe(`adult ${scenario.firstName} ${scenario.lastName} choosing ${insuranceType}`, () => {
      test('should perform a premium calculation', async ({ uitvaartverzekeringAfsluitenPage }) => {
        await allure.step('Step 1 - Verzekering samenstellen', async () => {
          await allure.step('Visit insurance premium calculation page', async () => {
            await uitvaartverzekeringAfsluitenPage.visit();
          });

          await allure.step(`Enter date of birth ${formatDate(dateOfBirth)} and continue`, async () => {
            await uitvaartverzekeringAfsluitenPage.enterGeboortedatum(dateOfBirth);
            await uitvaartverzekeringAfsluitenPage.continueToNextStep();
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
          await allure.step(`Fill in Persoonsgegevens (${initials} ${lastName} [${gender}])`, async () => {
            await uitvaartverzekeringAfsluitenPage.selectGender(gender);
            await uitvaartverzekeringAfsluitenPage.enterNameDetails(scenario);
          });

          await allure.step(`Fill in Adresgegevens (${zipCode}, ${houseNumber}))`, async () => {
            await uitvaartverzekeringAfsluitenPage.enterAddressDetails(scenario.addressDetails);
          });

          await allure.step(`Fill in Contactgegevens (${telephoneNumber}, ${emailAddress})`, async () => {
            await uitvaartverzekeringAfsluitenPage.enterContactDetails(scenario.contactDetails);
            await uitvaartverzekeringAfsluitenPage.continueToNextStep();
          });
        });

        await allure.step('Step 3- Gezondheisvragen', async () => {
          await expect(uitvaartverzekeringAfsluitenPage.mainContent).toMatchAriaSnapshot({
            name: 'insurance-premium-calculation-step3-health-questions.aria.yml',
          });
        });

        await uitvaartverzekeringAfsluitenPage.waitForTimeout(2000);
      });
    });
  }
});
