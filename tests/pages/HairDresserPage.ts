import { Locator, Page, expect } from "@playwright/test";
import { pageLogger } from "../support/logger";

export class HairdresserPage {
    private page: Page;
    private reviewBox:Locator
    private submitButton:Locator
    private successMessage:Locator
    private customerName:Locator
    private cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.reviewBox = page.locator(".MuiBox-root.css-17gwsy5");
    this.customerName = page.getByRole("textbox", { name: "Customer Name *" });
    this.submitButton = page.getByRole('button', { name: "Save Rating" });
    this.successMessage = page.locator(".MuiAlert-message.css-1xsto0d");
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

  }

  private get commentTextarea(): Locator {
  return this.page.getByRole("textbox", { name: "Comment" });
  }

  private reviewTriggerByRow(rowIndex: number): Locator {
  return this.page
    .locator("tbody tr")
    .nth(rowIndex - 1)
    .locator('div[aria-label$="out of 5 stars"]');
  }

  private setRatingStar(rating: number): Locator {
  return this.page.locator(
    'span.MuiRating-root label'
  ).nth(rating - 1);
  }

  private reviewCountByRow(rowIndex: number): Locator {
  return this.page
    .locator("tbody tr")
    .nth(rowIndex - 1)
    .locator("span.MuiTypography-caption");
  }

  async getReviewCount(rowIndex: number): Promise<number> {
  const text = await this.reviewCountByRow(rowIndex).innerText();
  const match = text.match(/\((\d+)\s+review/);
  return match ? Number(match[1]) : 0;
  }

  async navigateToListing() {
    await this.page.goto("/hairdressers-beauticians/list");
  }

  async selectHairdresser(rowIndex: number) {
    await this.reviewTriggerByRow(rowIndex).click();
  }

  private async waitForReviewBoxVisible() {
    await expect(this.reviewBox).toBeVisible({ timeout: 10000 });
    await this.reviewBox.waitFor({ state: 'visible', timeout: 10000 });
  }
 
  async enterCustomerName(name: string) {
    await this.waitForReviewBoxVisible()
    await this.customerName.fill(name);
  }


  async selectRating(rating: number) {
    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }
    const star = this.setRatingStar(rating);
    await expect(star).toBeVisible();
    pageLogger.debug(`Clicking on rating star: ${rating}`);
    await star.click();

  }

  async enterComment(comment: string) {
    await this.commentTextarea.click();
    await this.commentTextarea.fill(comment);
  }
      
  async submitReview() {
    await this.submitButton.click();
  }

  async cancelReview() { 
    await this.cancelButton.click();
  }

  async verifySubmissionResult(shouldSucceed: boolean): Promise<void> {
    if (shouldSucceed) {
     // pageLogger.info("Expecting review submission success");
      await expect(this.successMessage).toBeVisible({ timeout: 10000 });
      await expect(this.successMessage).toContainText(
        "Rating submitted successfully!"
      );
    } 
    else {
     // pageLogger.info("Expecting review submission cancellation");
      await expect(this.successMessage).not.toBeVisible({ timeout: 5000 });
    }
  }

  async verifyReviewCountChange(rowIndex: number,previousCount: number,shouldIncrement: boolean): Promise<void> {
    const expectedCount = shouldIncrement
      ? previousCount + 1
      : previousCount;

    await expect.poll(
      async () => await this.getReviewCount(rowIndex),
      { timeout: 5000 }
    ).toBe(expectedCount);
  }

}
