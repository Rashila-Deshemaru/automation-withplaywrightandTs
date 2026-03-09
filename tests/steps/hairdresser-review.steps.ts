import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { hairdresserFixture } from "../fixtures/hairdresser.fixture";

When(
  "the user selects hairdresser at row {int}",
  async function (this: CustomWorld, rowIndex: number) {
    if (!this.hairdresserPage) throw new Error("HairdresserPage not initialized");

    this.rowIndex = rowIndex;
    this.previousReviewCount = await this.hairdresserPage.getReviewCount(rowIndex);

    await this.hairdresserPage.selectHairdresser(rowIndex);
  }
);

When(
  "the user fills a positive review",
  async function (this: CustomWorld) {
    if (!this.hairdresserPage) throw new Error("HairdresserPage not initialized");

    this.hairdresserData = hairdresserFixture.positive();

    await this.hairdresserPage.enterCustomerName(this.hairdresserData.customerName);
    await this.hairdresserPage.selectRating(this.hairdresserData.rating);
    await this.hairdresserPage.enterComment(this.hairdresserData.comment);
  }
);

When(
  "the user fills a negative review",
  async function (this: CustomWorld) {
    if (!this.hairdresserPage) throw new Error("HairdresserPage not initialized");

    this.hairdresserData = hairdresserFixture.negative();

    await this.hairdresserPage.enterCustomerName(this.hairdresserData.customerName);
    await this.hairdresserPage.selectRating(this.hairdresserData.rating);
    await this.hairdresserPage.enterComment(this.hairdresserData.comment);
  }
);

When(
  "submits the review",
  async function (this: CustomWorld) {
    if (!this.hairdresserPage) throw new Error("HairdresserPage not initialized");

    await this.hairdresserPage.submitReview();
  }
);

When(
  "cancels the review",
  async function (this: CustomWorld) {
    if (!this.hairdresserPage) throw new Error("HairdresserPage not initialized");

    await this.hairdresserPage.cancelReview();
  }
);

Then(
  "the review should be submitted successfully",
  async function (this: CustomWorld) {
    if (!this.hairdresserPage) throw new Error("HairdresserPage not initialized");

    await this.hairdresserPage.verifySubmissionResult(true);
  }
);

Then(
  "the review should not be submitted",
  async function (this: CustomWorld) {
    if (!this.hairdresserPage) throw new Error("HairdresserPage not initialized");

    await this.hairdresserPage.verifySubmissionResult(false);
  }
);

Then(
  "the review count should increase at row {int}",
  async function (this: CustomWorld, rowIndex: number) {
    if (!this.hairdresserPage) throw new Error("HairdresserPage not initialized");

    await this.hairdresserPage.verifyReviewCountChange(rowIndex, this.previousReviewCount, true);
  }
);

Then(
  "the review count should not change at row {int}",
  async function (this: CustomWorld, rowIndex: number) {
    if (!this.hairdresserPage) throw new Error("HairdresserPage not initialized");

    await this.hairdresserPage.verifyReviewCountChange(rowIndex, this.previousReviewCount, false);
  }
);