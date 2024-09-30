import { Page } from 'puppeteer';

async function waitForNoErrors(page: Page): Promise<void> {
  // Wait until there are no error messages displayed on the page
  await page.waitForFunction(() => !document.querySelector("div[id*='error'] div[class*='error']"), { timeout: 1000 });
}

export default waitForNoErrors;
