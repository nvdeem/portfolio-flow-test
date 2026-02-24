import { expect, test } from '@playwright/test';
import { loadConfig } from '../config/loadConfig';
import { SignInPage } from '../pages/signIn.page';

test('user can sign in', async ({ page }) => {
  const config = loadConfig();
  const signInPage = new SignInPage(page);

  // Go to the sign-in URL from config.
  await signInPage.goto(config.baseUrl);

  // Check the form is ready.
  await signInPage.assertSignInFormVisible();

  // Sign in using local config values.
  await signInPage.signIn(config.username, config.password);

  // Assert /c is in URL.
  await expect(page).toHaveURL(/\/c(?:\/|$|\?)/);
});
