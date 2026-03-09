import { setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { hairdresserData } from "../fixtures/hairdresser.fixture";
import { HairdresserPage } from "../pages/HairDresserPage";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  rowIndex!: number;
  // rating!: number;
  // customerName!: string;
  hairdresserPage?: HairdresserPage
  hairdresserData!: hairdresserData
  previousReviewCount!: number;

  apiResponse: any;
  apiRequest: any;
}

setWorldConstructor(CustomWorld);
