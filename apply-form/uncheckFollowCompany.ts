import { ElementHandle, Page } from 'puppeteer';
import selectors from '../selectors';

async function deselectFollowCompany(page: Page): Promise<void> {
  // Locate the follow company checkbox
  const checkbox = await page.$(selectors.followCompanyCheckbox);

  // Deselect the checkbox if it is checked
  if (checkbox) {
    await (checkbox as ElementHandle<HTMLInputElement>).evaluate(el => el.checked && el.click());
  }
}

export default deselectFollowCompany;
