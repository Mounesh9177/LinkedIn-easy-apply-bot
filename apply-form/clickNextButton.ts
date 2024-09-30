import { Page } from 'puppeteer';
import selectors from '../selectors';

async function proceedToNext(page: Page): Promise<void> {
  // Click the "Next" button
  await page.click(selectors.nextButton);

  // Wait for the "Submit" or "Next" button to be enabled
  const nextOrSubmitButtonSelector = selectors.enabledSubmitOrNextButton;
  
  try {
    await page.waitForSelector(nextOrSubmitButtonSelector, { timeout: 10000 });
  } catch (error) {
    throw new Error(`Next or submit button not enabled within timeout: ${error}`);
  }
}

export default proceedToNext;
