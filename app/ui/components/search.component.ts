import { HeaderComponent } from '../components/header.component';
import { Page, Locator, expect } from '@playwright/test';
import { Category } from '../../types/types';

export class SearchComponent {
  readonly page: Page;
  public categories: Record<Category, Locator>;
  private searchFieldInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categories = {
      [Category.Men]: page.getByRole('button', { name: 'Чоловіки' }),
      [Category.Women]: page.getByRole('button', { name: 'Жінки' }),
      [Category.Children]: page.getByRole('button', { name: 'Діти' }),
    };
    this.searchFieldInput = page.locator('.search-home-input');
  }

  public async selectCatergoie(category: Category) {
    await this.categories[category].click();
  }

  private getOptionByName(name: string): Locator {
    return this.page.getByRole('option', { name: name, exact: true });
  }

  public async useSearch(name: string) {
    await this.searchFieldInput.click();
    await this.searchFieldInput.fill(name);
  }

  public async chooseFromSearch(name: string) {
    const option: Locator = this.getOptionByName(name);
    await option.click();
  }

  public async verifyCategories() {
    for (const locator of Object.values(this.categories)) {
      await expect(locator).toBeVisible();
    }
  }
}
