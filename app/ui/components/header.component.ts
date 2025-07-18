import { Page, Locator } from '@playwright/test';
export class HeaderComponent {
  readonly page: Page;
  readonly logoIcon: Locator;
  private burgerButton: Locator;
  private loginButton: Locator;
  private searchButton: Locator;
  readonly cartButton: Locator;
  private helpCenterButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoIcon = page.locator('[class*=logo-icon]');
    this.burgerButton = page.getByTestId('layout-header-toggle-menu');
    this.loginButton = page.getByTestId('layout-header-user-logon');
    this.searchButton = page.getByTestId('header-search-text-link');
    this.cartButton = page.getByTestId('layout-header-go-to-cart');
    this.helpCenterButton = page.getByTestId('notify-help-center-click');
  }

  public async goToSearch() {
    await this.searchButton.click();
  }

  public async openSideBarMenu() {
    await this.burgerButton.click();
  }

  public async goToLogin() {
    await this.loginButton.click();
  }

  public async openHelpCenter() {
    await this.helpCenterButton.click();
  }

  public async goToCart() {
    await this.cartButton.click();
  }
}
