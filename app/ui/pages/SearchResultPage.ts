import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/header.component';
import { SearchComponent } from '../components/search.component';
import { ProductCardComponent } from '../components/productCard.component';
import { SizeSelectorModal } from '../modals/sizeSelector.modal';
import { count } from 'console';

export class SearchResultPage extends BasePage {
  public headerComponent: HeaderComponent;
  public searchComponent: SearchComponent;
  public sizeSelectorModal: SizeSelectorModal;
  public productCardComponent: ProductCardComponent;
  private defaultClickArea: Locator;
  private sidePanel: Locator;

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
    this.searchComponent = new SearchComponent(page);
    this.sizeSelectorModal = new SizeSelectorModal(page);
    this.productCardComponent = new ProductCardComponent(page);
    this.defaultClickArea = page.locator('div[class*=sections-filters]');
    this.sidePanel = page.locator('.add-to-cart-notification-content');
  }

  public async addAllAvailAbleSizes(name?: string, color?: string): Promise<void> {
    await this.productCardComponent.chooseProduct(name, color);

    const sizeLocators: Locator[] = await this.sizeSelectorModal.sizeInStock.all();
    const sizesText: string[] = [];

    for (const el of sizeLocators) {
      const text = await el.textContent();
      if (text) {
        sizesText.push(text.trim());
      }
    }

    await this.defaultClickArea.click();

    let addedCount: number = 0;

    for (const el of sizesText) {
      await this.productCardComponent.chooseProduct(name, color);
      await expect(this.sizeSelectorModal.sizeSelectorWindow).toBeVisible();
      const sizeChoose = this.sizeSelectorModal.sizeInStock.filter({ hasText: el });
      if ((await sizeChoose.count()) > 0) {
        await sizeChoose.click();
        await expect(this.sidePanel).not.toBeVisible();
        addedCount++;
      } else {
        await this.defaultClickArea.click();
        throw new Error(`Size "${el}" is not found`);
      }
    }

    await expect(this.headerComponent.cartButton).toContainText(addedCount.toString());
  }
}
