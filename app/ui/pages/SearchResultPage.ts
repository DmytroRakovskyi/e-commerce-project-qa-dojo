import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/header.component';
import { SearchComponent } from '../components/search.component';
import { ProductCardComponent } from '../components/productCard.component';
import { SizeSelectorModal } from '../modals/sizeSelector.modal';

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

  public async addProductWithAvailableSizes(): Promise<void> {
    const productWithEnoughSizes = await this.findProductWithMinSizes(4);
    const selectedProductIndex = productWithEnoughSizes.product;
    const availableSizes = productWithEnoughSizes.sizes;

    const addedCount = await this.addAllSizesToCart(selectedProductIndex, availableSizes);

    await this.verifyCartCounter(addedCount);
  }

  private async findProductWithMinSizes(minSizes: number) {
    const allProducts = await this.productCardComponent.getAllProducts();
    for (let i = 0; i < allProducts.length; i++) {
      try {
        const sizes = await this.getProductSizes(i);
        if (sizes.length >= minSizes) {
          return { product: i, sizes };
        }
      } catch (error) {
        continue;
      }
    }
    throw new Error(`not found with ${minSizes}`);
  }

  private async getProductSizes(productIndex: number): Promise<string[]> {
    await this.productCardComponent.clickOnProductByIndex(productIndex);
    await expect(this.sizeSelectorModal.sizeSelectorWindow).toBeVisible();

    const sizeElements = await this.sizeSelectorModal.sizeInStock.all();
    const sizes: string[] = [];
    for (const element of sizeElements) {
      const sizeText = await element.textContent();
      if (sizeText) {
        sizes.push(sizeText.trim());
      }
    }
    await this.closeSideModal();
    return sizes;
  }

  private async addAllSizesToCart(productIndex: number, sizes: string[]): Promise<number> {
    let addedCount = 0;
    for (const size of sizes) {
      await this.addSingleSizeToCart(productIndex, size);
      addedCount++;
    }
    return addedCount;
  }

  private async addSingleSizeToCart(productIndex: number, size: string) {
    await this.productCardComponent.clickOnProductByIndex(productIndex);
    await expect(this.sizeSelectorModal.sizeSelectorWindow).toBeVisible();

    const sizeOption = this.sizeSelectorModal.sizeInStock.filter({ hasText: size });
    if ((await sizeOption.count()) === 0) {
      await this.closeSideModal();
      throw new Error('Size not found');
    }
    await sizeOption.click();
    await expect(this.sizeSelectorModal.sizeSelectorWindow).not.toBeVisible();
    await this.closeSidePanel();
  }
}
