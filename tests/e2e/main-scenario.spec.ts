import { test, expect } from '@playwright/test';
import { EntryPage } from '../../app/ui/pages/EntryPage';
import { MainPage } from '../../app/ui/pages/MainPage';
import { SearchResultPage } from '../../app/ui/pages/SearchResultPage';
import { CartPage } from '../../app/ui/pages/CartPage';
import { LoginPage } from '../../app/ui/pages/LoginPage';
import { SignUpPage } from '../../app/ui/pages/SignUpPage';
import { countries } from '../testdata/countries-dictionary';
import { Category } from '../../app/types/types';
const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
chromium.use(stealth());

test.describe('', { tag: ['@smoke', '@cookies'] }, () => {
  test('Zara-01, Main scenario', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const entryPage = new EntryPage(page);
    const mainPage = new MainPage(page);
    const seacrhResultPage = new SearchResultPage(page);
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);
    const signUpPage = new SignUpPage(page);
    await test.step('Navigate to entry page', async () => {
      await entryPage.navigateToEntryPage();
    });
    await test.step('Cookie dialogue content', async () => {
      await expect.soft(entryPage.cookieDialogue.dialogueContainer).toBeVisible();
    });
    await test.step('Accept all cookies, verify dialogue window is closed', async () => {
      await entryPage.cookieDialogue.acceptUsPolicies();
      await entryPage.cookieDialogue.clickOnAcceptButtonUs();

      await expect(entryPage.cookieDialogue.dialogueContainer).not.toBeVisible();
    });

    await test.step('Select country and check language and submit', async () => {
      await entryPage.selectCountry(countries.pl.code);
      await expect(entryPage.countrySelectrorButton).toContainText(countries.pl.name);
      await entryPage.selectLanguage(countries.ua.languageCode);
      await expect(entryPage.languageSelectorButton).toContainText(countries.ua.language);
      await entryPage.rememberChoice();
      await entryPage.submit();
    });

    await test.step('Go to seacrh page and choose category', async () => {
      await mainPage.headerComponent.goToSearch();
      await seacrhResultPage.searchComponent.verifyCategories();
      await seacrhResultPage.searchComponent.useSearch('jeans');
      await seacrhResultPage.searchComponent.chooseFromSearch('jeans');
      await seacrhResultPage.searchComponent.selectCatergoie(Category.Men);
      await expect(page).toHaveURL('/pl/uk/search?searchTerm=jeans&section=MAN');
    });

    await test.step('Search for the item and add all available sizes, navigate to the cart', async () => {
      await seacrhResultPage.addProductWithAvailableSizes();
      await seacrhResultPage.headerComponent.goToCart();
    });

    await test.step('Remove every second item from the cart and proceed to purchase', async () => {
      await expect(page).toHaveURL('pl/uk/shop/cart');
      await expect(cartPage.shoppingBagNavigation).toBeVisible();
      await expect(cartPage.whishListNavigation).toBeVisible();
      await cartPage.removeEverySecondItem();
      await cartPage.proceedToPurchase();
    });

    await test.step('Navigate to registration form, fill invalid data', async () => {
      await loginPage.goToRegistration();
      await signUpPage.fillSignUpForm();
      await signUpPage.sumbitRegistration();
    });

    await signUpPage.verifyErrorMessages('email');
    await signUpPage.verifyErrorMessages('password');
    await signUpPage.verifyErrorMessages('firstName');
    await signUpPage.verifyErrorMessages('lastName');
    await signUpPage.verifyErrorMessages('phone.number');
    await browser.close();
  });
});
