import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CookieDialogue } from '../modals/CookieDialogue';

export class EntryPage extends BasePage {
  public cookieDialogue: CookieDialogue;
  public countrySelectrorButton: Locator;
  public languageSelectorButton: Locator;
  private submitButton: Locator;
  private rememberChoiceCheckBox: Locator;

  constructor(page: Page) {
    super(page);
    this.cookieDialogue = new CookieDialogue(page);
    this.countrySelectrorButton = page.locator('button[id=downshift-0-toggle-button]');
    this.languageSelectorButton = page.locator('button[id=downshift-1-toggle-button]');
    this.submitButton = page.locator('[class*="submit-button"]');
    this.rememberChoiceCheckBox = page.locator('.zds-checkbox-control');
  }

  public async navigateToEntryPage() {
    await this.page.goto('https://www.zara.com/');
  }

  public async selectCountry(country: string) {
    await this.countrySelectrorButton.click();

    const option: Locator = this.page.getByRole('option', { name: `${country}` });
    await option.scrollIntoViewIfNeeded();
    await option.click();
  }

  public async selectLanguage(language: string) {
    await this.languageSelectorButton.click();

    const option: Locator = this.page.getByRole('option', { name: `${language}` });
    await option.scrollIntoViewIfNeeded();
    await option.click();
  }

  public async rememberChoice() {
    if (!(await this.rememberChoiceCheckBox.isChecked())) {
      await this.rememberChoiceCheckBox.check();
    }
  }

  public async submit() {
    await this.submitButton.click();
  }
}
