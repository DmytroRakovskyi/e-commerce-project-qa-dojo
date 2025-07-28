import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import { expect } from '@playwright/test';
import fs from 'fs';
import { EntryPage } from './app/ui/pages/EntryPage';
import { countries } from './tests/testdata/countries-dictionary';

async function globalSetup() {
  chromium.use(stealth());
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const entryPage = new EntryPage(page);
  await entryPage.navigateToEntryPage();
  await entryPage.cookieDialogue.acceptUsPolicies();
  await entryPage.cookieDialogue.clickOnAcceptButtonUs();
  await expect(entryPage.cookieDialogue.dialogueContainer).not.toBeVisible();
  await entryPage.selectCountry(countries.pl.code);
  await expect(entryPage.countrySelectrorButton).toContainText(countries.pl.name);
  await entryPage.selectLanguage(countries.ua.languageCode);
  await expect(entryPage.languageSelectorButton).toContainText(countries.ua.language);
  await entryPage.rememberChoice();
  await entryPage.submit();

  // Save storage state
  fs.mkdirSync('.auth', { recursive: true });
  await context.storageState({ path: '.auth/storage-state.json' });

  await context.close();
  await browser.close();
}

export default globalSetup;
