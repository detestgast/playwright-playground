import { Locator } from '@playwright/test';
import { DURATION } from '../consts/durations';
import { INSURANCE_TYPE } from '../consts/insuranceTypes';
import { PAYMENT_FREQUENCY } from '../consts/paymentFrequencies';
import { AddressDetails } from '../types/addressDetails';
import { ContactDetails } from '../types/contactDetails';
import { InsuranceOptions } from '../types/insuranceOptions';
import { Person } from '../types/person';
import { formatDate } from '../utils/date';
import { waitForAddressLookupResponse } from '../utils/network';
import { BasePage } from './base-page';

export class UitvaartverzekeringAfsluitenPage extends BasePage {
  readonly achternaamInput = this.page.getByRole('textbox', { name: 'Achternaam (geboortenaam)' });
  readonly betaalgegevensBtn = this.page.getByRole('button', { name: /Betaalgegevens/i });
  readonly bevestigKeuzeBtn = this.page.getByRole('button', { name: /Bevestig keuze/i });
  readonly emailInput = this.page.getByRole('textbox', { name: 'E-mailadres' });
  readonly gaVerderBtn = this.page.getByRole('button', { name: /Ga verder/i });
  readonly geboortedatumInput = this.page.getByRole('textbox', { name: 'Geboortedatum' });
  readonly geenVanBovenstaandeRadio = this.page.getByRole('radio', { name: /Nee, geen van bovenstaande/i });
  readonly gezondheidsvragenBtn = this.page.getByRole('button', { name: /Gezondheidsvragen/i });
  readonly huisnummerInput = this.page.getByRole('textbox', { name: 'Huisnummer' });
  readonly ingangsdatumInput = this.page.getByRole('textbox', { name: 'Ingangsdatum' });
  readonly insuranceRadioGroup = this.page.getByRole('radiogroup');
  readonly insuranceRadioOptions = this.insuranceRadioGroup.getByRole('radio'); // must follow insuranceRadioGroup
  readonly kiesZelfBedragInput = this.page.getByRole('textbox', { name: /Kies zelf een bedrag/i });
  readonly mainContent = this.page.getByRole('main');
  readonly meneerRadio = this.page.getByRole('radio', { name: 'Meneer' });
  readonly mevrouwRadio = this.page.getByRole('radio', { name: 'Mevrouw' });
  readonly perHalfJaarRadio = this.page.getByRole('radio', { name: /Per half jaar/i });
  readonly perJaarRadio = this.page.getByRole('radio', { name: /Per jaar/i });
  readonly perKwartaalRadio = this.page.getByRole('radio', { name: /Per kwartaal/i });
  readonly perMaandRadio = this.page.getByRole('radio', { name: /Per maand/i });
  readonly persoonsgegevensBtn = this.page.getByRole('button', { name: /Persoonsgegevens/i });
  readonly postcodeInput = this.page.getByRole('textbox', { name: 'Postcode' });
  readonly selecteerDienstenverzekeringBtn = this.page.getByRole('button', {
    name: /Selecteer dienstenverzekering en ga verder/i,
  });
  readonly selecteerGeldverzekeringBtn = this.page.getByRole('button', {
    name: /Selecteer geldverzekering en ga verder/i,
  });
  readonly telefoonnummerInput = this.page.getByRole('textbox', { name: 'Telefoonnummer' });
  readonly toevoegingInput = this.page.getByRole('textbox', { name: 'Toevoeging' });
  readonly tot65JaarRadio = this.page.getByRole('radio', { name: /Betaal tot 65 jaar/i });
  readonly totOverlijdenRadio = this.page.getByRole('radio', { name: /Betaal tot aan je overlijden/i });
  readonly tussenvoegselInput = this.page.getByRole('textbox', { name: 'Tussenvoegsel(s)' });
  readonly verzekeringSamenstellenBtn = this.page.getByRole('button', { name: /Verzekering samenstellen/i });
  readonly voorlettersInput = this.page.getByRole('textbox', { name: 'Voorletters' });
  readonly voornaamInput = this.page.getByRole('textbox', { name: 'Voornaam' });

  /**
   * Navigate to the insurance premium calculation start page and accept cookies if the banner is visible.
   */
  async visit() {
    await this.navigate('/verzekeringen/uitvaartverzekering/uitvaartverzekering-afsluiten');
    await this.acceptAllCookiesIfVisible();
  }

  /**
   * Enter the date of birth.
   * @param dateOfBirth The Date of birth to enter.
   */
  async enterGeboortedatum(dateOfBirth: Person['dateOfBirth']) {
    const formattedDate = formatDate(dateOfBirth);
    await this.geboortedatumInput.fill(formattedDate);
    await this.geboortedatumInput.press('Tab');
  }

  async continueToNextStep() {
    await this.gaVerderBtn.scrollIntoViewIfNeeded();
    await this.gaVerderBtn.click();
  }

  async confirmChoice() {
    await this.bevestigKeuzeBtn.scrollIntoViewIfNeeded();
    await this.bevestigKeuzeBtn.click();
  }

  async selectInsuranceOption(option: InsuranceOptions['insuranceOptions']['insuranceType']) {
    await this.insuranceRadioGroup.waitFor({ state: 'visible' });
    const buttons: Record<typeof option, Locator> = {
      [INSURANCE_TYPE.INKIND]: this.selecteerDienstenverzekeringBtn,
      [INSURANCE_TYPE.MONEY]: this.selecteerGeldverzekeringBtn,
    };
    await buttons[option].click();
  }

  async selectAmountOrAdditionalAmount(scenario: InsuranceOptions) {
    const { insuredAmount, additionalAmount } = scenario.insuranceOptions;
    if (insuredAmount && additionalAmount)
      throw new Error(
        `Cannot select both insuredAmount (${insuredAmount}) and additionalAmount (${additionalAmount}). Please provide only one.`,
      );
    if (!insuredAmount && !additionalAmount)
      throw new Error('Either insuredAmount or additionalAmount must be provided');
    await this.kiesZelfBedragInput.fill((insuredAmount ?? additionalAmount!).toString());
    await this.kiesZelfBedragInput.press('Tab');
  }

  async selectDuration(duration: InsuranceOptions['insuranceOptions']['duration']) {
    const radios: Record<typeof duration, Locator> = {
      [DURATION.UNTIL_AGE_65]: this.tot65JaarRadio,
      [DURATION.UNTIL_DEATH]: this.totOverlijdenRadio,
    };
    await radios[duration].click();
  }

  async selectPaymentFrequency(paymentFrequency: InsuranceOptions['insuranceOptions']['paymentFrequency']) {
    const radios: Record<typeof paymentFrequency, Locator> = {
      [PAYMENT_FREQUENCY.PER_MONTH]: this.perMaandRadio,
      [PAYMENT_FREQUENCY.PER_QUARTER]: this.perKwartaalRadio,
      [PAYMENT_FREQUENCY.PER_HALF_YEAR]: this.perHalfJaarRadio,
      [PAYMENT_FREQUENCY.PER_YEAR]: this.perJaarRadio,
    };
    await radios[paymentFrequency].click();
  }

  async selectGender(gender: Person['gender']) {
    const radio = gender === 'male' ? this.meneerRadio : this.mevrouwRadio;
    await radio.scrollIntoViewIfNeeded();
    await radio.click();
  }

  async enterNameDetails(person: Person) {
    const { firstName, initials, lastName, prefix } = person;
    await this.voornaamInput.scrollIntoViewIfNeeded();
    await this.voornaamInput.fill(firstName);
    await this.voorlettersInput.fill(initials);
    await this.tussenvoegselInput.fill(prefix ?? '');
    await this.achternaamInput.fill(lastName);
    await this.achternaamInput.press('Tab');
  }

  async enterAddressDetails(addressDetails: AddressDetails['addressDetails']) {
    const { zipCode, houseNumber, addition } = addressDetails;
    await this.postcodeInput.scrollIntoViewIfNeeded();
    await this.postcodeInput.fill(zipCode);
    await this.huisnummerInput.fill(houseNumber);
    await this.toevoegingInput.fill(addition ?? '');
    await this.toevoegingInput.press('Tab');
    await waitForAddressLookupResponse(this.page);
  }

  async enterContactDetails(contactDetails: ContactDetails['contactDetails']) {
    const { telephoneNumber, emailAddress } = contactDetails;
    await this.telefoonnummerInput.scrollIntoViewIfNeeded();
    await this.telefoonnummerInput.fill(telephoneNumber);
    await this.emailInput.fill(emailAddress);
    await this.emailInput.press('Tab');
  }

  async selectNoneOfTheAboveForHealthQuestions() {
    await this.geenVanBovenstaandeRadio.scrollIntoViewIfNeeded();
    await this.geenVanBovenstaandeRadio.click();
  }
}
