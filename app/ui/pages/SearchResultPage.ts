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
  private sidePanelCloseButton: Locator;

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
    this.searchComponent = new SearchComponent(page);
    this.sizeSelectorModal = new SizeSelectorModal(page);
    this.productCardComponent = new ProductCardComponent(page);
    this.defaultClickArea = page.locator('div[class*=sections-filters]');
    this.sidePanel = page.locator('.add-to-cart-notification-content');
    this.sidePanelCloseButton = this.page.getByRole('button', { name: 'Закрити' });
  }

  private async closeSideModal() {
    await this.defaultClickArea.click();
  }

  private async closeSidePanel() {
    await this.sidePanelCloseButton.click();
  }

  private async verifyCartCounter(expectedCount: number): Promise<void> {
    await expect(this.headerComponent.cartButton).toContainText(expectedCount.toString());
  }

  public async addProductWithAvailAbleSizes(name?: string, color?: string) {
    const availableSizes: string[] = await this.getAvailAbleSizes(name, color);
    const count: number = await this.addSizesToCart(availableSizes, name, color);
    await this.verifyCartCounter(count);
  }

  private async getAvailAbleSizes(name?: string, color?: string): Promise<string[]> {
    await this.productCardComponent.chooseProduct(name, color);
    await expect(this.sizeSelectorModal.sizeSelectorWindow).toBeVisible();

    const sizeLocators: Locator[] = await this.sizeSelectorModal.sizeInStock.all();
    const sizesText: string[] = [];
    for (const element of sizeLocators) {
      const text = await element.textContent();
      if (text) {
        sizesText.push(text.trim());
      }
    }
    await this.closeSideModal();
    return sizesText;
  }

  private async addSizesToCart(sizes: string[], name?: string, color?: string): Promise<number> {
    let count: number = 0;
    for (const size of sizes) {
      await this.addSingleSizeToCart(size, color, name);
      count++;
    }
    return count;
  }

  private async addSingleSizeToCart(size: string, name?: string, color?: string) {
    await this.productCardComponent.chooseProduct(name, color);
    await expect(this.sizeSelectorModal.sizeSelectorWindow).toBeVisible();

    const sizeOption: Locator = this.sizeSelectorModal.sizeInStock.filter({ hasText: size });

    if ((await sizeOption.count()) === 0) {
      await this.closeSideModal();
      throw Error(`Size ${size} not found`);
    }
    await sizeOption.click();
    await expect(this.sizeSelectorModal.sizeSelectorWindow).not.toBeVisible();
    await this.closeSidePanel();
  }
}
