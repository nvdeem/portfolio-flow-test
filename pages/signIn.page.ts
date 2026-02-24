import { expect, type Page } from '@playwright/test';

export class SignInPage {
  constructor(private readonly page: Page) {}

  async goto(baseUrl: string): Promise<void> {
    // Open the sign-in page.
    await this.page.goto(baseUrl);
  }

  async assertSignInFormVisible(): Promise<void> {
    // Basic check that the form is visible.
    await expect(this.page.locator('input[name="username"]')).toBeVisible();
    await expect(this.page.locator('input[name="password"]')).toBeVisible();
    await expect(this.page.locator('button[type="submit"]')).toBeVisible();
  }

  async signIn(username: string, password: string): Promise<void> {
    // Enter credentials and submit.
    await this.page.locator('input[name="username"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.locator('button[type="submit"]').click();
  }
}
