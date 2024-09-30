import { Page } from 'puppeteer';
import selectors from '../selectors';
import fillFields from '../apply-form/fillFields';
import waitForNoErrors from '../apply-form/waitForNoErrors';
import clickNextButton from '../apply-form/clickNextButton';

const noop = () => { };

export interface ApplicationFormData {
  phone: string;
  cvFilePath: string;
  homeCity: string;
  coverLetterFilePath: string;
  yearsOfExperience: { [key: string]: number };
  languageProficiency: { [key: string]: string };
  requiresVisaSponsorship: boolean;
  booleans: { [key: string]: boolean };
  textFields: { [key: string]: string };
  multipleChoiceFields: { [key: string]: string };
}

interface ApplyParams {
  page: Page;
  link: string;
  formData: ApplicationFormData;
  shouldSubmit: boolean;
}

async function applyToJob({ page, link, formData, shouldSubmit }: ApplyParams): Promise<void> {
  // Navigate to the job posting link
  await page.goto(link, { waitUntil: 'load', timeout: 60000 });

  try {
    await clickEasyApplyButton(page);
  } catch {
    console.log(`Easy apply button not found in posting: ${link}`);
    return;
  }

  let maxPages = 5;

  while (maxPages--) {
    await fillFields(page, formData).catch(noop);
    await clickNextButton(page).catch(noop);
    await waitForNoErrors(page).catch(noop);
  }

  const submitButton = await page.$(selectors.submit);

  if (!submitButton) {
    throw new Error('Submit button not found');
  }

  if (shouldSubmit) {
    await submitButton.click();
  }
}

async function clickEasyApplyButton(page: Page): Promise<void> {
  await page.waitForSelector(selectors.easyApplyButtonEnabled, { timeout: 10000 });
  await page.click(selectors.easyApplyButtonEnabled);
}

export default applyToJob;
