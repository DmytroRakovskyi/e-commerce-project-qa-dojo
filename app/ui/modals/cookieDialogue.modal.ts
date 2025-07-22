import { Page, Locator } from '@playwright/test';

export class CookieDialogue {
  readonly page: Page;
  readonly dialogueContainer: Locator;
  readonly policyText: Locator;
  readonly policyLink: Locator;
  private acceptCookiesButton: Locator;
  private acceptUsCookiesButton: Locator;
  private rejectOptionalCookiesButton: Locator;
  private cookiesSettingsButton: Locator;
  private usCookiesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialogueContainer = page.locator('//*[@id="onetrust-group-container"]');
    this.policyText = page.locator('//*[@id="onetrust-policy-text"]');
    this.policyLink = page.locator('a[class="ot-cookie-policy-link"]');
    this.acceptCookiesButton = page.locator('button[id*="onetrust-accept"]');
    this.acceptUsCookiesButton = page.locator('button[id*="accept-rec"]');
    this.rejectOptionalCookiesButton = page.locator('button[id*="onetrust-reject"]');
    this.cookiesSettingsButton = page.getByRole('button', { name: 'Cookies Settings' });
    this.usCookiesButton = page.locator('button[id="onetrust-pc-btn-handler"]');
  }

  public async acceptUsPolicies() {
    await this.usCookiesButton.click();
  }

  public async clickOnAcceptButtonUs() {
    await this.acceptUsCookiesButton.click();
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
