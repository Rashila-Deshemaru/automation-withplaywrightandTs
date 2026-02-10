import { Page, expect, Locator} from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  private get emailInput(): Locator {
    return this.page.getByRole("textbox", { name: "Email" });
  }

  private get passwordInput(): Locator {
    return this.page.getByRole("textbox", { name: "Password" });
  }

  private get loginButton(): Locator {
    return this.page.getByRole("button", { name: "Sign in now" });
  }

  async navigate() {
    await this.page.goto("/login", { waitUntil: "domcontentloaded" });

    await this.emailInput.waitFor({ state: "visible", timeout: 20000 });
  }

  async login(email: string, password: string) {
    await this.emailInput.click();
    await this.emailInput.fill(email);

    await this.passwordInput.click();
    await this.passwordInput.fill(password);

    await this.loginButton.click();
  }

  async assertDashboardLoaded() {
    await expect(
      this.page.getByRole("heading", { name: /dashboard/i })
    ).toBeVisible({ timeout: 20000 });
  }
}
