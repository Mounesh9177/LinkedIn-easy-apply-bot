import { Page } from 'puppeteer';
import selectors from '../selectors';
import setTextInput from './setTextInput';

async function setHomeCity(page: Page, homeCity: string): Promise<void> {
  // Update the home city field with the provided value
  await setTextInput(page, selectors.homeCity, homeCity);
}

export default setHomeCity;
