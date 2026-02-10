import { Before, After, BeforeAll } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { CustomWorld } from "./world";
import { config } from "./config";
import { BeforeStep, AfterStep } from "@cucumber/cucumber";
import { stepLogger } from "./logger";

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({
    headless: false,
    slowMo: 50, 
  });

  this.context = await this.browser.newContext({
    baseURL: config.baseUrl,
    ignoreHTTPSErrors: true,
    javaScriptEnabled: true,
    viewport: { width: 1920, height: 1080  },
  });

  this.page = await this.context.newPage();
});


After(async function (this: CustomWorld) {
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});


BeforeStep(function ({ pickleStep }) {
  stepLogger.info(`➡️ ${pickleStep.text}`);
});

AfterStep(function ({ result }) {
  if (result?.status === "FAILED") {
    stepLogger.error(" Step failed");
  }
});

