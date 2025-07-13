import { test, expect } from '@playwright/test';
import { HomePage } from '../../app/ui/pages/HomePage';
import { dialogueText } from '../testdata/test-data.json';
import { countries } from '../testdata/countries-dictionary';
const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
chromium.use(stealth());

test.describe('', { tag: ['@smoke', '@cookies'] }, () => {
  test('Zara-01, accept cookie, select language and country and navigate to shop', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const homePage = new HomePage(page);
    test.step('Navigate to home page', async () => {
      await homePage.navigateToHomePage();
    });
    await test.step('Cookie dialogue content', async () => {
      await expect.soft(homePage.cookieDialogue.dialogueContainer).toBeVisible();
      await expect.soft(homePage.cookieDialogue.policyText).toContainText(dialogueText);
    });
    await test.step('Accept all cookies, verify dialogue window is closed', async () => {
      await homePage.cookieDialogue.clickOnAcceptButton();
      await expect(homePage.cookieDialogue.dialogueContainer).not.toBeVisible();
    });

    await test.step('Select country and check language and submit', async () => {
      await homePage.selectCountry(countries.ua.name);
      await expect(homePage.countrySelectrorButton).toContainText(countries.ua.name);
      await homePage.selectLanguage(countries.ua.language);
      await expect(homePage.languageSelectorButton).toContainText(countries.ua.language);
      await homePage.submit();
      await expect(page).toHaveURL(countries.ua.urlPart);
    });

    await browser.close();
  });
});
