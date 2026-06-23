import { test as base } from '@playwright/test';
import * as allure from 'allure-js-commons';
import fs from 'fs';
import { UitvaartverzekeringAfsluitenPage } from '../pages/uitvaartverzekering-afsluiten-page';

type DelaFixtures = {
  uitvaartverzekeringAfsluitenPage: UitvaartverzekeringAfsluitenPage;
};

export const test = base.extend<DelaFixtures>({
  uitvaartverzekeringAfsluitenPage: async ({ page }, use) => {
    const uitvaartverzekeringAfsluitenPage = new UitvaartverzekeringAfsluitenPage(page);
    await use(uitvaartverzekeringAfsluitenPage);
  },
});

test.afterEach(async ({}, testInfo) => {
  const tracePath = testInfo.outputPath('trace.zip');

  if (fs.existsSync(tracePath)) {
    allure.attachment('Playwright Trace', fs.readFileSync(tracePath), 'application/zip');
  }
});

export { expect } from '@playwright/test';
