import { Page, Locator } from '@playwright/test';

export class CookieDialogue {
  readonly page: Page;
  readonly dialogueContainer: Locator;
  readonly policyText: Locator;
  readonly policyLink: Locator;
  private acceptCookiesButton: Locator;
  private rejectOptionalCookiesButton: Locator;
  private cookiesSettingsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialogueContainer = page.getByLabel('Cookie banner');
    this.policyText = page.getByText('We use first-party and third-');
    this.policyLink = page.getByRole('link', { name: 'Cookies policy' });
    this.acceptCookiesButton = page.getByRole('button', { name: 'Accept All Cookies' });
    this.rejectOptionalCookiesButton = page.getByRole('button', {
      name: 'Reject optional cookies',
    });
    this.cookiesSettingsButton = page.getByRole('button', { name: 'Cookies Settings' });
  }

  public async clickOnAcceptButton() {
    await this.acceptCookiesButton.click();
  }
  public async clickOnRejectButton() {
    await this.rejectOptionalCookiesButton.click();
  }
  public async clickOnSettubgsButton() {
    await this.cookiesSettingsButton.click();
  }

  public async goToCookiesPolicy() {
    await this.policyLink.click();
  }
}
