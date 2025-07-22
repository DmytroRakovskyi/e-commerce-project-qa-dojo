import { Page, Locator } from '@playwright/test';
import { strict } from 'assert';
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
    try {
      await this.selectProductByNameAndColor(name!, color!);
    } catch (error) {
      await this.selectProductByPosition(0);
    }
  }

  private async selectProductByPosition(position: number) {
    await this.productCard.locator(this.addToTheCartButton).nth(position).click();
  }

  private async selectProductByNameAndColor(name: string, color: string) {
    const productWithName: Locator = this.productCard.filter({ hasText: name });
    const dedicatedColor: Locator = this.productCard.filter({ has: this.page.getByLabel(color) });
    const selectedProduct: Locator = productWithName.filter({ has: dedicatedColor });
    await selectedProduct.locator(this.addToTheCartButton).first().click();
  }
}
