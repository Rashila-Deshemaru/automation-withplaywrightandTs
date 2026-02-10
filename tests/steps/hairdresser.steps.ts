import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { HairdresserPage } from "../pages/HairDresserPage";
import { LoginPage } from "../pages/LoginPage";
import { CustomWorld } from "../support/world";
import { config } from "../support/config";
import { hairdresserFixture } from "../fixtures/hairdresser.fixture";
import { stepLogger } from "../support/logger";

let hairdresserPage: HairdresserPage;


Given(
  "the user is logged in",
  { timeout: 30 * 1000 },
  async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);

    await loginPage.navigate();
    await loginPage.login(config.user.email, config.user.password);
    await loginPage.assertDashboardLoaded();
  }
);

Given(
  "the user is on the hairdresser listing page",
  async function (this: CustomWorld) {
    hairdresserPage = new HairdresserPage(this.page);
    await hairdresserPage.navigateToListing();
  }
);

When(
  "the user selects hairdresser at row {int}",
  async function (this: CustomWorld, rowIndex: number) {
   // stepLogger.info(`Selecting hairdresser at row ${rowIndex}`);
    this.rowIndex = rowIndex;
    this.previousReviewCount =
      await hairdresserPage.getReviewCount(rowIndex);

    await hairdresserPage.selectHairdresser(rowIndex);
  }
);

When(
  "the user fills a positive review",
  async function (this: CustomWorld) {
    this.hairdresserData = hairdresserFixture.positive();

    await hairdresserPage.enterCustomerName(this.hairdresserData.customerName);
    await hairdresserPage.selectRating(this.hairdresserData.rating);
    await hairdresserPage.enterComment(this.hairdresserData.comment);
  }
);

When(
  "submits the review",
  async function () {
    await hairdresserPage.submitReview();
  }
);

When(
  "the user fills a negative review",
  async function (this: CustomWorld) {
    this.hairdresserData = hairdresserFixture.negative();

    await hairdresserPage.enterCustomerName(this.hairdresserData.customerName);
    await hairdresserPage.selectRating(this.hairdresserData.rating);
    await hairdresserPage.enterComment(this.hairdresserData.comment);
  }
);

When(
  "cancels the review",
  async function () {
    await hairdresserPage.cancelReview();
  }
);

Then(
  "the review should be submitted successfully",
  async function () {
    await hairdresserPage.verifySubmissionResult(true);
  }
);

Then(
  "the review should not be submitted",
  async function () {
    await hairdresserPage.verifySubmissionResult(false);
  }
);

Then(
  "the review count should increase at row {int}",
  async function (this: CustomWorld, rowIndex: number) {
    await hairdresserPage.verifyReviewCountChange(
      rowIndex,
      this.previousReviewCount,
      true
    );
  }
);

Then(
  "the review count should not change at row {int}",
  async function (this: CustomWorld, rowIndex: number) {
    await hairdresserPage.verifyReviewCountChange(
      rowIndex,
      this.previousReviewCount,
      false
    );
  }
);




