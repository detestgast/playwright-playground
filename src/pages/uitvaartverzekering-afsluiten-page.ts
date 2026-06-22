import { BasePage } from './base-page';
import { Page, Locator } from '@playwright/test';
import { INSURANCE_OPTIONS } from '../consts/insurance-options';

export class UitvaartverzekeringAfsluitenPage extends BasePage {
  readonly betaalgegevensBtn: Locator;
  readonly dobInput: Locator;
  readonly gaVerderBtn: Locator;
  readonly gezondheidsvragenBtn: Locator;
  readonly insuranceRadioGroup: Locator;
  readonly insuranceRadioOptions: Locator;
  readonly mainContent: Locator;
  readonly persoonsgegevensBtn: Locator;
  readonly verzekeringSamenstellenBtn: Locator;
  readonly selecteerDienstenverzekeringBtn: Locator;
  readonly selecteerGeldverzekeringBtn: Locator;

  constructor(page: Page) {
    super(page);

    // Locators
    this.mainContent = this.page.getByRole('main');

    this.verzekeringSamenstellenBtn = this.page.getByRole('button', { name: /Verzekering samenstellen/i });
    this.persoonsgegevensBtn = this.page.getByRole('button', { name: /Persoonsgegevens/i });
    this.gezondheidsvragenBtn = this.page.getByRole('button', { name: /Gezondheidsvragen/i });
    this.betaalgegevensBtn = this.page.getByRole('button', { name: /Betaalgegevens/i });
    this.selecteerDienstenverzekeringBtn = this.page.getByRole('button', {
      name: /Selecteer dienstenverzekering en ga verder/i,
    });
    this.selecteerGeldverzekeringBtn = this.page.getByRole('button', {
      name: /Selecteer geldverzekering en ga verder/i,
    });

    this.dobInput = this.page.getByRole('textbox', { name: 'Geboortedatum' });
    this.gaVerderBtn = this.page.getByRole('button', { name: /Ga verder/i });

    this.insuranceRadioGroup = this.page.getByRole('radiogroup');
    this.insuranceRadioOptions = this.insuranceRadioGroup.getByRole('radio');
  }

  /**
   * Navigate to the insurance premium calculation start page and accept cookies if the banner is visible.
   */
  async visit() {
    await this.navigate('/verzekeringen/uitvaartverzekering/uitvaartverzekering-afsluiten');
    await this.acceptAllCookiesIfVisible();
  }

  /**
   * Enter the date of birth and click the 'Ga verder' button.
   * @param geboortedatum The date of birth to enter.
   */
  async enterGeboortedatumAndContinue(geboortedatum: string) {
    await this.dobInput.fill(geboortedatum);
    await this.gaVerderBtn.click();
  }

  async openVerzekeringSamenstellen() {
    await this.verzekeringSamenstellenBtn.click();
  }

  async openPersoonsgegevens() {
    await this.persoonsgegevensBtn.click();
  }

  async openGezondheidsvragen() {
    await this.gezondheidsvragenBtn.click();
  }

  async openBetaalgegevens() {
    await this.betaalgegevensBtn.click();
  }

  async selectInsuranceOption(option: (typeof INSURANCE_OPTIONS)[keyof typeof INSURANCE_OPTIONS]) {
    await this.insuranceRadioGroup.waitFor({ state: 'visible' });
    switch (option) {
      case INSURANCE_OPTIONS.SERVICE:
        await this.selecteerDienstenverzekeringBtn.click();
        break;
      case INSURANCE_OPTIONS.MONEY:
        await this.selecteerGeldverzekeringBtn.click();
        break;
      default:
        throw new Error(`Unknown insurance option: ${option}`);
    }
  }
}
