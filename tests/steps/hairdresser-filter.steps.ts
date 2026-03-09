import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { waitForGraphQL } from "../support/api/graphqlHelper";

When(
  "the user applies {string} status filter",
  { timeout: 60000 },
  async function (this: CustomWorld, status: "Active" | "Disabled") {
    if (!this.hairdresserPage) {
      throw new Error("HairdresserPage not initialized in CustomWorld");
    }

    const apiStatus = status === "Disabled" ? "inactive" : "active";

    const responsePromise = waitForGraphQL(this.page, apiStatus);

    await this.hairdresserPage.clickFilterIcon();
    await this.hairdresserPage.selectStatusRadioButton(status);
    await this.hairdresserPage.clickApplyFilter();

    this.apiResponse = await responsePromise;
  }
);

Then(
  "API should return only inactive users",
  async function (this: CustomWorld) {
    const users = this.apiResponse?.data?.getAllAppUsers?.users;
    if (!users) throw new Error("No users found in API response");

    for (const user of users) {
      expect(user.status).toBe("inactive");
    }
  }
);

Then(
  "UI should match API response",
  async function (this: CustomWorld) {
    if (!this.hairdresserPage) throw new Error("HairdresserPage not initialized");

    const users = this.apiResponse?.data?.getAllAppUsers?.users;
    if (!users) throw new Error("No users found in API response");

    await this.hairdresserPage.waitForTableToLoad();

    const rowCount = await this.hairdresserPage.getRowCount();
    expect(rowCount).toBe(users.length);

    for (let i = 0; i < users.length; i++) {
      const uiData = await this.hairdresserPage.getRowData(i);
      const apiFullName = `${users[i].firstName} ${users[i].lastName}`;

      expect(uiData.firstName + " " + uiData.lastName).toBe(apiFullName);
      expect(uiData.email).toBe(users[i].emailDetail.email);
      expect(uiData.status?.toLowerCase()).toContain("inactive");
    }
  }
);