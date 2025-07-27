import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignUpPage extends BasePage {
  private emailIntupt: Locator;
  private passwordInput: Locator;
  private fisrtNameInput: Locator;
  private lastNameInput: Locator;
  private phonePrefixInput: Locator;
  private phoneInput: Locator;
  private sumbitRegistrationButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailIntupt = page.locator('input[data-qa-input-qualifier="email"]');
    this.passwordInput = page.locator('input[data-qa-input-qualifier="password"]');
    this.fisrtNameInput = page.locator('input[data-qa-input-qualifier="firstName"]');
    this.lastNameInput = page.locator('input[data-qa-input-qualifier="lastName"]');
    this.phonePrefixInput = page.locator('input[name="phone.prefix"]');
    this.phoneInput = page.locator('input[name="phone.number"]');
    this.sumbitRegistrationButton = page.locator('button[data-qa-action="sign-up-submit"]');
  }

  public async fillSignUpForm(
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    phonePrefix?: string,
    phoneNumber?: string,
  ): Promise<void> {
    if (email !== undefined) await this.fillEmail(email);
    if (password !== undefined) await this.fillPassword(password);
    if (firstName !== undefined) await this.fillFirstName(firstName);
    if (lastName !== undefined) await this.fillLastName(lastName);
    if (phonePrefix !== undefined) await this.fillPhonePrefix(phonePrefix);
    if (phoneNumber !== undefined) await this.fillPhoneNumber(phoneNumber);
  }

  private errorById(errorId: string): Locator {
    return this.page.locator(`[class="form-input-error"][id*='${errorId}']`);
  }

  public async verifyErrorMessages(errorId: string, errorText?: string) {
    const error: Locator = this.errorById(errorId);
    await expect(error).toBeVisible();
    if (errorText) {
      await expect(error).toHaveText(errorText);
    }
  }

  private async fillEmail(email: string): Promise<void> {
    await this.emailIntupt.fill(email);
  }
  private async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }
  private async fillFirstName(firstName: string): Promise<void> {
    await this.fisrtNameInput.fill(firstName);
  }

  private async fillLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  private async fillPhonePrefix(prefix: string): Promise<void> {
    await this.phonePrefixInput.fill(prefix);
  }

  private async fillPhoneNumber(phone: string): Promise<void> {
    await this.phoneInput.fill(phone);
  }

  public async sumbitRegistration() {
    await this.sumbitRegistrationButton.click();
  }
}
