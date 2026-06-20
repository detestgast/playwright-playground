import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class UitvaartverzekeringAfsluitenPage extends BasePage {
  readonly verzekeringSamenstellenBtn: Locator;
  readonly persoonsgegevensBtn: Locator;
  readonly gezondheidsvragenBtn: Locator;
  readonly betaalgegevensBtn: Locator;
  readonly dobInput: Locator;
  readonly gaVerderBtn: Locator;

  constructor(page: Page) {
    super(page);

    // Locators
    this.verzekeringSamenstellenBtn = this.page.getByRole('button', { name: /Verzekering samenstellen/i });
    this.persoonsgegevensBtn = this.page.getByRole('button', { name: /Persoonsgegevens/i });
    this.gezondheidsvragenBtn = this.page.getByRole('button', { name: /Gezondheidsvragen/i });
    this.betaalgegevensBtn = this.page.getByRole('button', { name: /Betaalgegevens/i });

    this.dobInput = this.page.getByRole('textbox', { name: 'Geboortedatum' });
    this.gaVerderBtn = this.page.getByRole('button', { name: /Ga verder/i });
  }

  async visit() {
    await this.navigate('/verzekeringen/uitvaartverzekering/uitvaartverzekering-afsluiten');
    await this.acceptAllCookiesIfVisible();
  }

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
}
