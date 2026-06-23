import { BasePage } from './base-page';
import { Page, Locator } from '@playwright/test';
import { INSURANCE_OPTIONS } from '../consts/insurance-options';
import { InsuranceOptions } from '../types/insuranceOptions';

export class UitvaartverzekeringAfsluitenPage extends BasePage {
  readonly betaalgegevensBtn: Locator;
  readonly chooseOwnedAmountInput: Locator;
  readonly dobInput: Locator;
  readonly gaVerderBtn: Locator;
  readonly gezondheidsvragenBtn: Locator;
  readonly insuranceRadioGroup: Locator;
  readonly insuranceRadioOptions: Locator;
  readonly mainContent: Locator;
  readonly persoonsgegevensBtn: Locator;
  readonly selecteerDienstenverzekeringBtn: Locator;
  readonly selecteerGeldverzekeringBtn: Locator;
  readonly verzekeringSamenstellenBtn: Locator;

  constructor(page: Page) {
    super(page);

    // Locators
    this.betaalgegevensBtn = this.page.getByRole('button', { name: /Betaalgegevens/i });
    this.chooseOwnedAmountInput = this.page.getByRole('textbox', { name: /Kies zelf een bedrag/i });
    this.dobInput = this.page.getByRole('textbox', { name: 'Geboortedatum' });
    this.gaVerderBtn = this.page.getByRole('button', { name: /Ga verder/i });
    this.gezondheidsvragenBtn = this.page.getByRole('button', { name: /Gezondheidsvragen/i });
    this.insuranceRadioGroup = this.page.getByRole('radiogroup');
    this.insuranceRadioOptions = this.insuranceRadioGroup.getByRole('radio');
    this.mainContent = this.page.getByRole('main');
    this.persoonsgegevensBtn = this.page.getByRole('button', { name: /Persoonsgegevens/i });
    this.selecteerDienstenverzekeringBtn = this.page.getByRole('button', {
      name: /Selecteer dienstenverzekering en ga verder/i,
    });
    this.selecteerGeldverzekeringBtn = this.page.getByRole('button', {
      name: /Selecteer geldverzekering en ga verder/i,
    });
    this.verzekeringSamenstellenBtn = this.page.getByRole('button', { name: /Verzekering samenstellen/i });
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
   * @param geboortedatum The Date of birth to enter.
   */
  async enterGeboortedatumAndContinue(geboortedatum: Date) {
    const formattedDate = geboortedatum.toLocaleDateString('nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    await this.dobInput.fill(formattedDate);
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

  async selectInsuranceOption(option: InsuranceOptions['insuranceOptions']['insuranceType']) {
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

  async selectAmountOrAdditionalAmount(scenario: InsuranceOptions) {
    if (scenario.insuranceOptions.insuredAmount) {
      const insuredAmountInput = this.page.getByRole('textbox', {
        name: /Invoerveld voor Kies zelf een bedrag/i,
      });
      await insuredAmountInput.fill(scenario.insuranceOptions.insuredAmount.toString());
    }

    if (scenario.insuranceOptions.additionalAmount) {
      await this.chooseOwnedAmountInput.fill(scenario.insuranceOptions.additionalAmount.toString());
    }
  }
}
