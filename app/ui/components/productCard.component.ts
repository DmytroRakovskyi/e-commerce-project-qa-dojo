import { Page, Locator, expect } from '@playwright/test';
export class ProductCardComponent {
  readonly page: Page;
  readonly productCard: Locator;
  readonly addToTheCartButton: Locator;
  readonly productColor: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCard = page.locator('.product-grid-product');
    this.addToTheCartButton = page.locator('button[class*="product-add-to-cart"]');
    this.productColor = page.locator('p[class*="info-colors"]');
  }

  public async getAllProducts(): Promise<Locator[]> {
    return await this.productCard.all();
  }

  public async clickOnProductByIndex(index: number): Promise<void> {
    const products = await this.getAllProducts();
    if (index >= products.length || index < 0) {
      throw new Error('Out of range');
    }

    await products[index].waitFor({ state: 'visible' });
    const addButton = products[index].locator(this.addToTheCartButton);
    await addButton.waitFor({ state: 'visible' });
    await addButton.click();
  }
}
