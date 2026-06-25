import { test as base } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { UitvaartverzekeringAfsluitenPage } from '../pages/uitvaartverzekering-afsluiten-page';

type DelaFixtures = {
  uitvaartverzekeringAfsluitenPage: UitvaartverzekeringAfsluitenPage;
};

type AxeFixture = {
  makeAxeBuilder: () => AxeBuilder;
};

export const test = base.extend<DelaFixtures & AxeFixture>({
  uitvaartverzekeringAfsluitenPage: async ({ page }, use) => {
    const uitvaartverzekeringAfsluitenPage = new UitvaartverzekeringAfsluitenPage(page);
    await use(uitvaartverzekeringAfsluitenPage);
  },
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () => new AxeBuilder({ page }).withTags(['wcag21aa']);
    await use(makeAxeBuilder);
  },
});

export { expect } from '@playwright/test';
