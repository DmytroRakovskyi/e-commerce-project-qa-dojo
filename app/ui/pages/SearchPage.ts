import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from '../components/header';
import { Category } from '../../types/types';

export class SearchPage extends BasePage {
  public header: Header;
  public categories: Record<Category, Locator>;
  private seacrhFieldInput: Locator;
  private searchOption: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);

    this.categories = {
      [Category.Men]: page.getByRole('button', { name: 'Чоловіки' }),
      [Category.Women]: page.getByRole('button', { name: 'Жінки' }),
      [Category.Children]: page.getByRole('button', { name: 'Діти' }),
    };

    this.seacrhFieldInput = page.locator('.search-home-input');
    this.searchOption = page.getByRole('option');
  }

  public async selectCatergoie(category: Category) {
    await this.categories[category].click();
  }

  public async useSearch(item: string) {
    await this.seacrhFieldInput.click();
    await this.seacrhFieldInput.fill(item);
    await this.searchOption.filter({ hasText: item }).click();
  }
}
