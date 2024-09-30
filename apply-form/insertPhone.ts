import { Page } from 'puppeteer';
import selectors from '../selectors';
import setTextInput from './setTextInput';

async function setPhoneNumber(page: Page, phone: string): Promise<void> {
  // Update the phone number field with the provided value
  await setTextInput(page, selectors.phone, phone);
}

export default setPhoneNumber;
