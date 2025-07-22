import { test, expect } from '@playwright/test';
import { EntryPage } from '../../app/ui/pages/EntryPage';
import { MainPage } from '../../app/ui/pages/MainPage';
import { SearchResultPage } from '../../app/ui/pages/SearchResultPage';
import { countries } from '../testdata/countries-dictionary';
import { Category } from '../../app/types/types';
const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
chromium.use(stealth());

test.describe('', { tag: ['@smoke', '@cookies'] }, () => {
  test('Zara-01, accept cookie, select language and country and navigate to shop', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const entryPage = new EntryPage(page);
    const mainPage = new MainPage(page);
    const seacrhResultPage = new SearchResultPage(page);
    await test.step('Navigate to entry page', async () => {
      await entryPage.navigateToEntryPage();
    });
    await test.step('Cookie dialogue content', async () => {
      await expect.soft(entryPage.cookieDialogue.dialogueContainer).toBeVisible();
    });
    await test.step('Accept all cookies, verify dialogue window is closed', async () => {
      await entryPage.cookieDialogue.acceptUsCookies();
      await expect(entryPage.cookieDialogue.dialogueContainer).not.toBeVisible();
    });

    await test.step('Select country and check language and submit', async () => {
      await entryPage.selectCountry(countries.ua.code);
      await expect(entryPage.countrySelectrorButton).toContainText(countries.ua.name);
      await entryPage.selectLanguage(countries.ua.languageCode);
      await expect(entryPage.languageSelectorButton).toContainText(countries.ua.language);
      await entryPage.rememberChoice();
      await entryPage.submit();
    });

    await test.step('go to seacrh page and choose category and search for the item', async () => {
      await mainPage.headerComponent.goToSearch();
      await seacrhResultPage.searchComponent.verifyCategories();
      await seacrhResultPage.searchComponent.useSearch('jeans');
      await seacrhResultPage.searchComponent.chooseFromSearch('jeans');
      await seacrhResultPage.searchComponent.selectCatergoie(Category.Men);
      await expect(page).toHaveURL('/ua/uk/search?searchTerm=jeans&section=MAN');
      await seacrhResultPage.addProductWithAvailAbleSizes();
      await seacrhResultPage.headerComponent.goToCart();
      await expect(page).toHaveURL('ua/uk/shop/cart');
    });

    await browser.close();
  });
});
