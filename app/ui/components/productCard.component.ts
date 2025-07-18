import { Page, Locator } from '@playwright/test';
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

  public async chooseProduct(name?: string, color?: string): Promise<void> {
    let selectedProduct: Locator;
    try {
      if (name && color) {
        const productWithName: Locator = this.productCard.filter({
          hasText: name,
        });
        const dedicatedColor: Locator = this.productColor.filter({
          has: this.page.getByLabel(color),
        });
        selectedProduct = productWithName.filter({ has: dedicatedColor });
        let locatorCount: number = await selectedProduct.count();

        if (locatorCount === 1) {
          await selectedProduct.locator(this.addToTheCartButton).click();
        } else if (locatorCount > 1) {
          await selectedProduct.locator(this.addToTheCartButton).first().click();
        }
      } else if (name && !color) {
        const productWithName: Locator = this.productCard.filter({
          hasText: name,
        });

        let locatorCount: number = await productWithName.count();
        if (locatorCount === 1) {
          await productWithName.locator(this.addToTheCartButton).click();
        } else if (locatorCount > 1) {
          await productWithName.locator(this.addToTheCartButton).first().click();
        } else {
          await this.productCard.locator(this.addToTheCartButton).first().click();
        }
      } else {
        await this.productCard.locator(this.addToTheCartButton).first().click();
      }
    } catch (error) {
      throw new Error('Test failed because the product cannot be chosen');
    }
  }
}
