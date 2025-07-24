import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/header.component';
import { ProductCardComponent } from '../components/productCard.component';
import { it } from 'node:test';

export class CartPage extends BasePage {
  private headerComponent: HeaderComponent;
  private productCardComponent: ProductCardComponent;
  readonly shoppingBagNavigation: Locator;
  readonly whishListNavigation: Locator;
  private removeItemButton: Locator;
  private addItemButton: Locator;
  private quantitySelector: Locator;
  private removalToast: Locator;
  private continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
    this.productCardComponent = new ProductCardComponent(page);
    this.shoppingBagNavigation = page.locator('a[data-qa-action*="Shopping_bag"]');
    this.whishListNavigation = page.locator('a[data-qa-action*="link-Wishlist"]');
    this.removeItemButton = page.getByTestId('remove-order-item-unit');
    this.addItemButton = page.getByTestId('add-order-item-unit');
    this.quantitySelector = page.locator('.zds-quantity-selector');
    this.removalToast = page.locator('[class*="zds-toast-content"]');
    this.continueButton = page.getByTestId('shop-continue');
  }

  private async getAllItemQuantitySelectors(): Promise<Locator[]> {
    const quantitySelectors: Locator[] = await this.quantitySelector.all();
    return quantitySelectors;
    console.log(quantitySelectors);
  }

  public async removeEverySecondItem() {
    const quantitySelectors: Locator[] = await this.getAllItemQuantitySelectors();
    const itemsToRemove: Locator[] = quantitySelectors.filter((_, index) => index % 2 === 1);

    for (const item of itemsToRemove) {
      if (await item.isVisible()) {
        console.log(item.locator(this.removeItemButton));
        await item.locator(this.removeItemButton).click();
        await this.verifyRemovalToast();
      }
    }
  }

  private async verifyRemovalToast() {
    await expect(this.removalToast).toBeVisible();
  }

  public async proceedToPurchase() {
    await this.continueButton.click();
  }
}
