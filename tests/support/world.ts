import { setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { hairdresserData } from "../fixtures/hairdresser.fixture";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  rowIndex!: number;
  // rating!: number;
  // customerName!: string;
  hairdresserData!: hairdresserData
  previousReviewCount!: number;
}

setWorldConstructor(CustomWorld);
