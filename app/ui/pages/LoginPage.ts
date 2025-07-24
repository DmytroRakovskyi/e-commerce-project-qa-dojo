import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private emailIntupt: Locator;
  private passwordInput: Locator;
  private recoveryPasswordLink: Locator;
  private logInButton: Locator;
  private registerButton: Locator;
  private continueAsAGuestButton: Locator;
  private helpButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailIntupt = page.locator('input[data-qa-input-qualifier="logonId"]');
    this.passwordInput = page.locator('input[data-qa-input-qualifier="password"]');
    this.recoveryPasswordLink = page.locator('a[class="recovery-password-link"]');
    this.logInButton = page.getByTestId('logon-form-submit');
    this.registerButton = page.locator('a[class*="register-button"]');
    this.continueAsAGuestButton = page.getByTestId('continue-as-guest-link');
    this.helpButton = page.locator('a[class="help-link"]');
  }

  public async goToRegistration() {
    await this.registerButton.click();
  }
}
