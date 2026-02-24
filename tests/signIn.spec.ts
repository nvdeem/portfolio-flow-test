import { expect, test } from '@playwright/test';
import { loadConfig } from '../config/loadConfig';
import { HomePage } from '../pages/home.page';
import { SignInPage } from '../pages/signIn.page';

test('user can sign in and see correct portfolio value', async ({ page }) => {
  const config = loadConfig();
  const signInPage = new SignInPage(page);
  const homePage = new HomePage(page);

  // Go to the sign-in URL from config.
  await signInPage.goto(config.baseUrl);

  // Check the form is ready.
  await signInPage.assertSignInFormVisible();

  // Sign in using local config values.
  await signInPage.signIn(config.username, config.password);

  // TODO: Handle "Approve new device" checkpoint. Skipped for now due to timebox.

  // Assert portfolio value is visible.
  await homePage.assertPortfolioValueVisible();

  // Assert portfolio value matches config.
  const displayedValue = await homePage.getPortfolioValueText();
  // Format expected value as 2 decimals so it matches the UI text.
  await expect(displayedValue).toBe(config.expectedPortfolioValue.toFixed(2));
});
