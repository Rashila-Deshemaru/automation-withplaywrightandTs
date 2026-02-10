import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { LoginPage } from "../pages/LoginPage";
import { config } from "../support/config";

let loginPage: LoginPage;

Given("the user is on the login page", async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When("the user logs in with valid credentials", async function (this: CustomWorld) {
  const { email, password } = config.user;

  await loginPage.login(email, password);
});

Then("the user should be redirected to the dashboard", async function () {
  await loginPage.assertDashboardLoaded();
});

