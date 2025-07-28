import { test } from '../fixtures/baseFixture';
import { expect } from '@playwright/test';
import { Category } from '../../app/types/types';

test.describe('', { tag: ['@smoke', '@main'] }, () => {
  test('Zara-02, Main scenario', async ({
    stealthMainPage,
    stealthSearchResultPage,
    stealthCartPage,
    stealthLoginPage,
    stealthSignUpPage,
  }) => {
    await test.step('Navigate to main page', async () => {
      await stealthMainPage.navigateToMainPage();
    });
    await test.step('Go to seacrh page and choose category', async () => {
      await stealthMainPage.headerComponent.goToSearch();
      await stealthSearchResultPage.searchComponent.verifyCategories();
      await stealthSearchResultPage.searchComponent.useSearch('jeans');
      await stealthSearchResultPage.searchComponent.chooseFromSearch('jeans');
      await stealthSearchResultPage.searchComponent.selectCatergoie(Category.Men);
      await expect(stealthSearchResultPage.page).toHaveURL(
        '/pl/uk/search?searchTerm=jeans&section=MAN',
      );
    });

    await test.step('Search for the item and add all available sizes, navigate to the cart', async () => {
      await stealthSearchResultPage.addProductWithAvailableSizes();
      await stealthSearchResultPage.headerComponent.goToCart();
    });

    await test.step('Remove every second item from the cart and proceed to purchase', async () => {
      await expect(stealthCartPage.page).toHaveURL('pl/uk/shop/cart');
      await expect(stealthCartPage.shoppingBagNavigation).toBeVisible();
      await expect(stealthCartPage.whishListNavigation).toBeVisible();
      await stealthCartPage.removeEverySecondItem();
      await stealthCartPage.proceedToPurchase();
    });

    await test.step('Navigate to registration form, fill invalid data', async () => {
      await stealthLoginPage.goToRegistration();
      await stealthSignUpPage.fillSignUpForm();
      await stealthSignUpPage.sumbitRegistration();
    });

    await test.step('Errors messages appear for input fields', async () => {
      await stealthSignUpPage.verifyErrorMessages('email');
      await stealthSignUpPage.verifyErrorMessages('password');
      await stealthSignUpPage.verifyErrorMessages('firstName');
      await stealthSignUpPage.verifyErrorMessages('lastName');
      await stealthSignUpPage.verifyErrorMessages('phone.number');
    });
  });
});
