import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { HairdresserPage } from "../pages/HairDresserPage";
import { LoginPage } from "../pages/LoginPage";
import { CustomWorld } from "../support/world";
import { config } from "../support/config";


Given(
  "the user is logged in",
  { timeout: 50 * 1000 },
  async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.navigate();
    await loginPage.login(config.user.email, config.user.password);
    await loginPage.assertDashboardLoaded();
    await this.page.waitForLoadState('networkidle'); 
  }
);

Given("the user is on the hairdresser listing page", async function (this: CustomWorld) {
  const hairdresserPage = new HairdresserPage(this.page);
  await hairdresserPage.navigateToListing();
  await this.page.waitForLoadState('networkidle'); 
  this.hairdresserPage = hairdresserPage; 
});

