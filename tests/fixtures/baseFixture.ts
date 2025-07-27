import { test as base, Browser, Page } from '@playwright/test';
import { EntryPage } from '../../app/ui/pages/EntryPage';
import { MainPage } from '../../app/ui/pages/MainPage';
import { SearchResultPage } from '../../app/ui/pages/SearchResultPage';
import { CartPage } from '../../app/ui/pages/CartPage';
import { LoginPage } from '../../app/ui/pages/LoginPage';
import { SignUpPage } from '../../app/ui/pages/SignUpPage';
import { userInfo } from 'os';
const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth');

export type Fixtures = {
  stealthBrowser: Browser;
  stealthPage: Page;
  entryPage: EntryPage;
  mainPage: MainPage;
  searchResultPage: SearchResultPage;
  loginPage: LoginPage;
  cartPage: CartPage;
  signUpPage: SignUpPage;
  stealthEntryPage: EntryPage;
  stealthMainPage: MainPage;
  stealthSearchResultPage: SearchResultPage;
  stealthLoginPage: LoginPage;
  stealthCartPage: CartPage;
  stealthSignUpPage: SignUpPage;
};

export const test = base.extend<Fixtures>({
  stealthBrowser: async ({}, use) => {
    chromium.use(stealth());
    const browser = await chromium.launch();
    await use(browser);
    await browser.close();
  },

  stealthPage: async ({ stealthBrowser }, use) => {
    const page = await stealthBrowser.newPage();
    await use(page);
    await page.close();
  },

  entryPage: async ({ page }, use) => {
    const entryPage = new EntryPage(page);
    await use(entryPage);
  },
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await use(mainPage);
  },

  searchResultPage: async ({ page }, use) => {
    const searchResultPage = new SearchResultPage(page);
    await use(searchResultPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await use(signUpPage);
  },

  stealthEntryPage: async ({ stealthPage }, use) => {
    const entryPage = new EntryPage(stealthPage);
    await use(entryPage);
  },
  stealthMainPage: async ({ stealthPage }, use) => {
    const mainPage = new MainPage(stealthPage);
    await use(mainPage);
  },

  stealthSearchResultPage: async ({ stealthPage }, use) => {
    const searchResultPage = new SearchResultPage(stealthPage);
    await use(searchResultPage);
  },

  stealthLoginPage: async ({ stealthPage }, use) => {
    const loginPage = new LoginPage(stealthPage);
    await use(loginPage);
  },
  stealthCartPage: async ({ stealthPage }, use) => {
    const cartPage = new CartPage(stealthPage);
    await use(cartPage);
  },

  stealthSignUpPage: async ({ stealthPage }, use) => {
    const signUpPage = new SignUpPage(stealthPage);
    await use(signUpPage);
  },
});
