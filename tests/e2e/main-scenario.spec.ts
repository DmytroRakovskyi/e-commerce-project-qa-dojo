import { test } from '../fixtures/baseFixture';
import { expect } from '@playwright/test';

import { countries } from '../testdata/countries-dictionary';
import { Category } from '../../app/types/types';
const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
chromium.use(stealth());

test.describe('', { tag: ['@smoke', '@cookies'] }, () => {
  test('Zara-01, Main scenario', async ({
    stealthEntryPage,
    stealthMainPage,
    stealthSearchResultPage,
    stealthCartPage,
    stealthLoginPage,
    stealthSignUpPage,
  }) => {
    await test.step('Navigate to entry page', async () => {
      await stealthEntryPage.navigateToEntryPage();
    });
    await test.step('Cookie dialogue content visibility', async () => {
      await expect.soft(stealthEntryPage.cookieDialogue.dialogueContainer).toBeVisible();
    });
    await test.step('Accept all cookies, verify dialogue window is closed', async () => {
      await stealthEntryPage.cookieDialogue.acceptUsPolicies();
      await stealthEntryPage.cookieDialogue.clickOnAcceptButtonUs();

      await expect(stealthEntryPage.cookieDialogue.dialogueContainer).not.toBeVisible();
    });

    await test.step('Select country and check language and submit', async () => {
      await stealthEntryPage.selectCountry(countries.pl.code);
      await expect(stealthEntryPage.countrySelectrorButton).toContainText(countries.pl.name);
      await stealthEntryPage.selectLanguage(countries.ua.languageCode);
      await expect(stealthEntryPage.languageSelectorButton).toContainText(countries.ua.language);
      await stealthEntryPage.rememberChoice();
      await stealthEntryPage.submit();
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

    await stealthSignUpPage.verifyErrorMessages('email');
    await stealthSignUpPage.verifyErrorMessages('password');
    await stealthSignUpPage.verifyErrorMessages('firstName');
    await stealthSignUpPage.verifyErrorMessages('lastName');
    await stealthSignUpPage.verifyErrorMessages('phone.number');
  });
});
