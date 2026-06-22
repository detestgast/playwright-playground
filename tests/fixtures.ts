import { test as base } from '@playwright/test';
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

export { expect } from '@playwright/test';
