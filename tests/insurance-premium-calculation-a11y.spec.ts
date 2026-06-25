import { TestInfo } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { test, expect } from '../src/fixtures/fixtures';

test.describe('DELA uitvaartverzekering', () => {
  test('should not have any accessibility violations', async ({ uitvaartverzekeringAfsluitenPage, makeAxeBuilder }, testInfo: TestInfo) => {
    const axeBuilder = makeAxeBuilder();

    await allure.step('Step 1 - Verzekering samenstellen', async () => {
      await allure.step('Visit insurance premium calculation page', async () => {
        await uitvaartverzekeringAfsluitenPage.visit();
        expect(uitvaartverzekeringAfsluitenPage.geboortedatumInput).toBeVisible();
      });

      await allure.step('Perform accessibility check', async () => {
        const results = await axeBuilder.analyze();

        await testInfo.attach('Accessibility Violations', {
          body: JSON.stringify(
            {
              passed: results.passes,
              failed: results.violations,
              cannotAudit: results.incomplete,
            },
            null,
            2,
          ),
          contentType: 'application/json',
        });

        expect(results.violations).toEqual([]);
      });
    });
  });
});
