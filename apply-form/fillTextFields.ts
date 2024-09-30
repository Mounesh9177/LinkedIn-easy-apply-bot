import { Page } from 'puppeteer';
import selectors from '../selectors';
import setTextInput from './setTextInput';

interface TextInputFields {
  [labelPattern: string]: string | number;
}

async function handleTextFields(page: Page, textInputFields: TextInputFields): Promise<void> {
  // Get all input elements of text type
  const textInputs = await page.$$(selectors.textInput);

  for (const input of textInputs) {
    // Retrieve the ID and corresponding label for each text input
    const inputId = await input.evaluate((el) => el.id);
    const inputLabel = await page.$eval(`label[for="${inputId}"]`, (el) => el.innerText).catch(() => '');

    // Loop through text fields and match the label pattern
    for (const [labelPattern, fieldValue] of Object.entries(textInputFields)) {
      if (new RegExp(labelPattern, 'i').test(inputLabel)) {
        // Update the text input with the corresponding value
        await setTextInput(input, '', fieldValue.toString());
      }
    }
  }
}

export default handleTextFields;
