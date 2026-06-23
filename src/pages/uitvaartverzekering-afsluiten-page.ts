import { BasePage } from './base-page';
import { Page, Locator } from '@playwright/test';
import { INSURANCE_TYPE } from '../consts/insurance_types';
import { InsuranceOptions } from '../types/insuranceOptions';
import { formatDate } from '../utils/date';
import { DURATION } from '../consts/durations';

export class UitvaartverzekeringAfsluitenPage extends BasePage {
  readonly betaalgegevensBtn: Locator;
  readonly chooseOwnAmountInput: Locator;
  readonly dobInput: Locator;
  readonly gaVerderBtn: Locator;
  readonly gezondheidsvragenBtn: Locator;
  readonly insuranceRadioGroup: Locator;
  readonly insuranceRadioOptions: Locator;
  readonly mainContent: Locator;
  readonly persoonsgegevensBtn: Locator;
  readonly selecteerDienstenverzekeringBtn: Locator;
  readonly selecteerGeldverzekeringBtn: Locator;
  readonly tot65JaarRadio: Locator;
  readonly totOverlijdenRadio: Locator;
  readonly verzekeringSamenstellenBtn: Locator;

  constructor(page: Page) {
    super(page);

    // Locators
    this.betaalgegevensBtn = this.page.getByRole('button', { name: /Betaalgegevens/i });
    this.chooseOwnAmountInput = this.page.getByRole('textbox', { name: /Kies zelf een bedrag/i });
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
    this.tot65JaarRadio = this.page.getByRole('radio', { name: /Betaal tot 65 jaar/i });
    this.totOverlijdenRadio = this.page.getByRole('radio', { name: /Betaal tot aan je overlijden/i });
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
   * Enter the date of birth.
   * @param geboortedatum The Date of birth to enter.
   */
  async enterGeboortedatum(geboortedatum: Date) {
    const formattedDate = formatDate(geboortedatum);
    await this.dobInput.fill(formattedDate);
  }

  async continueToNextStep() {
    await this.gaVerderBtn.click();
  }

  async selectInsuranceOption(option: InsuranceOptions['insuranceOptions']['insuranceType']) {
    await this.insuranceRadioGroup.waitFor({ state: 'visible' });
    switch (option) {
      case INSURANCE_TYPE.SERVICE:
        await this.selecteerDienstenverzekeringBtn.click();
        break;
      case INSURANCE_TYPE.MONEY:
        await this.selecteerGeldverzekeringBtn.click();
        break;
      default:
        throw new Error(`Unknown insurance option: ${option}`);
    }
  }

  async selectAmountOrAdditionalAmount(scenario: InsuranceOptions) {
    const { insuredAmount, additionalAmount } = scenario.insuranceOptions;

    if (insuredAmount && additionalAmount) {
      throw new Error(
        `Cannot select both insuredAmount (${insuredAmount}) and additionalAmount (${additionalAmount}). ` +
          'Please provide only one.',
      );
    }

    if (!insuredAmount && !additionalAmount) {
      throw new Error('Either insuredAmount or additionalAmount must be provided');
    }

    const amountToFill = insuredAmount || additionalAmount;
    await this.chooseOwnAmountInput.fill(amountToFill!.toString());
  }

  async selectDuration(duration: InsuranceOptions['insuranceOptions']['duration']) {
    switch (duration) {
      case DURATION.UNTIL_AGE_65:
        await this.tot65JaarRadio.click();
        break;
      case DURATION.UNTIL_DEATH:
        await this.totOverlijdenRadio.click();
      default:
        break;
    }
  }
}
