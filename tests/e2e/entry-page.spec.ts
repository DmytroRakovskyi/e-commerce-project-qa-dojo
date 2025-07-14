import { test, expect } from '@playwright/test';
import { EntryPage } from '../../app/ui/pages/EntryPage';
import { MainPage } from '../../app/ui/pages/MainPage';
import { SearchPage } from '../../app/ui/pages/SearchPage';
import { countries } from '../testdata/countries-dictionary';
import { Category } from '../../app/types/types';
const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
chromium.use(stealth());

test.describe('', { tag: ['@smoke', '@cookies'] }, () => {
  test('Zara-01, accept cookie, select language and country and navigate to shop', async ({
    page,
  }) => {
    // const browser = await chromium.launch();
    // const page = await browser.newPage();
    const entryPage = new EntryPage(page);
    const mainPage = new MainPage(page);
    const seacrhPage = new SearchPage(page);
    test.step('Navigate to entry page', async () => {
      await entryPage.navigateToEntryPage();
    });
    await test.step('Cookie dialogue content', async () => {
      await expect.soft(entryPage.cookieDialogue.dialogueContainer).toBeVisible();
    });
    await test.step('Accept all cookies, verify dialogue window is closed', async () => {
      await entryPage.cookieDialogue.clickOnAcceptButton();
      await expect(entryPage.cookieDialogue.dialogueContainer).not.toBeVisible();
    });

    await test.step('Select country and check language and submit', async () => {
      await entryPage.selectCountry(countries.ua.name);
      await expect(entryPage.countrySelectrorButton).toContainText(countries.ua.name);
      await entryPage.selectLanguage(countries.ua.language);
      await expect(entryPage.languageSelectorButton).toContainText(countries.ua.language);
      await entryPage.rememberChoice();
      await entryPage.submit();
      await expect(page).toHaveURL(countries.ua.urlPart);
    });

    await test.step('go to seacrh page and choose category and search for the item', async () => {
      await mainPage.header.goToSearch();
      await expect(page).toHaveURL('/ua/uk/search/home');
      await seacrhPage.selectCatergoie(Category.Men);
      await seacrhPage.useSearch('parfum');
      await expect(page).toHaveURL('/ua/uk/search?searchTerm=parfum&section=MAN');
    });

    // await browser.close();
  });
});
