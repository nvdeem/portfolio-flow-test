import { expect, type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  private portfolioValueWidget() {
    // This is the full portfolio value component on the page.
    return this.page.getByTestId('portfolio-value');
  }

  private portfolioValueStatus() {
    // This inner status node gives the clean value text (e.g. 0.00).
    return this.portfolioValueWidget().locator('[role="status"]');
  }

  async assertPortfolioValueVisible(): Promise<void> {
    // Assert the portfolio value widget is visible.
    await expect(this.portfolioValueWidget()).toBeVisible();
  }

  async getPortfolioValueText(): Promise<string> {
    // Get the accessible status text, e.g. 0.00.
    const valueText = await this.portfolioValueStatus().textContent();
    return (valueText ?? '').trim();
  }
}
