import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CookieDialogue } from '../modals/cookieDialogue.modal';

export class EntryPage extends BasePage {
  readonly cookieDialogue: CookieDialogue;
  readonly countrySelectrorButton: Locator;
  readonly languageSelectorButton: Locator;
  private submitButton: Locator;
  private rememberChoiceCheckBox: Locator;

  constructor(page: Page) {
    super(page);
    this.cookieDialogue = new CookieDialogue(page);
    this.countrySelectrorButton = page.locator('select[name="selectedStore"]');
    this.languageSelectorButton = page.locator('select[name="selectedLanguage"]');
    this.submitButton = page.locator('[class*="submit-button"]');
    this.rememberChoiceCheckBox = page.locator('.zds-checkbox-control');
  }

  public async navigateToEntryPage() {
    await this.page.goto('https://www.zara.com/');
  }

  public async selectCountry(country: string) {
    await this.countrySelectrorButton.click();
    await this.countrySelectrorButton.selectOption({ value: country });
  }

  public async selectLanguage(language: string) {
    await this.languageSelectorButton.click();
    await this.languageSelectorButton.selectOption({ value: language });
  }

  public async rememberChoice() {
    if (!(await this.rememberChoiceCheckBox.isChecked())) {
      return await this.rememberChoiceCheckBox.check();
    }
  }

  public async submit() {
    await this.submitButton.click();
  }
}
