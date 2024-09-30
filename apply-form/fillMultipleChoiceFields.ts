import { Page } from 'puppeteer';
import selectors from '../selectors';

interface MultiChoiceFields {
  [labelPattern: string]: string;
}

async function handleMultipleChoiceFields(page: Page, multiChoiceFields: MultiChoiceFields): Promise<void> {
  // Get all select elements
  const selectElements = await page.$$(selectors.select);

  for (const select of selectElements) {
    // Retrieve the ID and corresponding label for the select element
    const selectId = await select.evaluate((el) => el.id);
    const selectLabel = await page.$eval(`label[for="${selectId}"]`, (el) => el.innerText);

    // Loop through the multiple choice fields and match the label pattern
    for (const [labelPattern, desiredValue] of Object.entries(multiChoiceFields)) {
      if (new RegExp(labelPattern, 'i').test(selectLabel)) {
        // Find the matching option based on the value
        const matchedOption = await select.$$eval(
          selectors.option,
          (options, desiredValue) => {
            const option = (options as HTMLOptionElement[]).find(
              (opt) => opt.value.toLowerCase() === desiredValue.toLowerCase()
            );
            return option && option.value;
          },
          desiredValue
        );

        // Select the matching option if found
        if (matchedOption) {
          await select.select(matchedOption);
        }
      }
    }
  }
}

export default handleMultipleChoiceFields;
