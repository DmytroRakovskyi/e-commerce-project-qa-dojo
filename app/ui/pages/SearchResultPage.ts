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
    this.sidePanelCloseButton = page.getByRole('button', { name: 'Закрити' });
  }

  private async closeSideModal(): Promise<void> {
    await this.defaultClickArea.click();
    await expect(this.sizeSelectorModal.sizeSelectorWindow).not.toBeVisible();
  }

  private async closeSidePanel(): Promise<void> {
    await this.sidePanelCloseButton.click();
  }

  private async verifyCartCounter(expectedCount: number): Promise<void> {
    await expect(this.headerComponent.cartButton).toContainText(expectedCount.toString());
  }

  public async addProductWithAvailableSizes(minSizes: number = 4): Promise<void> {
    const productWithEnoughSizes = await this.findProductWithMinSizes(minSizes);
    const selectedProductIndex: number = productWithEnoughSizes.product;
    const availableSizes: string[] = productWithEnoughSizes.sizes;

    const addedCount: number = await this.addAllSizesToCart(selectedProductIndex, availableSizes);

    await this.verifyCartCounter(addedCount);
  }

  private async findProductWithMinSizes(
    minSizes: number,
  ): Promise<{ product: number; sizes: string[] }> {
    await expect(this.defaultClickArea).toBeVisible();

    await expect(this.productCardComponent.productCard.first()).toBeVisible();
    const allProducts: Locator[] = await this.productCardComponent.getAllProducts();
    console.log(`Found ${allProducts.length} products to check`);

    for (let i = 0; i < allProducts.length; i++) {
      try {
        await this.productCardComponent.clickOnProductByIndex(i);
        await expect(this.sizeSelectorModal.sizeSelectorWindow).toBeVisible();

        const sizeElements: Locator[] = await this.sizeSelectorModal.sizeInStock.all();
        const availableSizes: string[] = [];

        for (const element of sizeElements) {
          const sizeText = await element.textContent();
          if (sizeText) {
            availableSizes.push(sizeText.trim());
          }
        }

        if (availableSizes.length >= minSizes) {
          await this.closeSideModal();
          return { product: i, sizes: availableSizes };
        }

        await this.closeSideModal();
      } catch (error) {
        console.log(`Failed to check product ${i}:`, error);
        if (await this.sizeSelectorModal.sizeSelectorWindow.isVisible()) {
          await this.closeSideModal();
        }
      }
    }

    throw new Error(`No product found with ${minSizes}+ sizes`);
  }

  private async addAllSizesToCart(productIndex: number, sizes: string[]): Promise<number> {
    let addedCount: number = 0;
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
