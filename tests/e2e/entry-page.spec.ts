import { test } from '../fixtures/baseFixture';
import { expect } from '@playwright/test';
import { countries } from '../testdata/countries-dictionary';

test.describe(
  'Zara-01, Entry page functionality',
  { tag: ['@smoke', '@entry', '@skipGlobalSetup'] },
  () => {
    test(
      'Accept cookies, select language',
      { tag: ['@skipGlobalSetup'] },
      async ({ stealthEntryPage }) => {
        await test.step('Navigate to entry page', async () => {
          await stealthEntryPage.navigateToEntryPage();
        });
        await test.step('Cookie dialogue content visibility', async () => {
          await expect(stealthEntryPage.cookieDialogue.dialogueContainer).toBeVisible();
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
          await expect(stealthEntryPage.languageSelectorButton).toContainText(
            countries.ua.language,
          );
          await stealthEntryPage.rememberChoice();
          await stealthEntryPage.submit();
        });
      },
    );
  },
);
