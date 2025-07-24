import { Page, Locator } from '@playwright/test';

export class SizeSelectorModal {
  private page: Page;
  readonly sizeSelectorWindow: Locator;
  readonly sizeInStock: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sizeSelectorWindow = page.locator('ul[class=size-selector-sizes]');
    this.sizeInStock = page.locator('button[data-qa-action="size-in-stock"]');
  }
}
