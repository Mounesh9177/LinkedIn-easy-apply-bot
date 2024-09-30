import { ElementHandle, Page } from 'puppeteer';
import selectors from '../selectors';

async function fillBooleanFields(page: Page, booleans: { [key: string]: boolean }): Promise<void> {
  // Fill radio buttons (2-option fieldsets)
  const fieldsets = await page.$$(selectors.fieldset);

  for (const fieldset of fieldsets) {
    const radioOptions = await fieldset.$$(selectors.radioInput);

    if (radioOptions.length === 2) {
      const fieldsetLabel = await fieldset.$eval('legend', el => el.innerText);

      for (const [labelRegex, value] of Object.entries(booleans)) {
        if (new RegExp(labelRegex, 'i').test(fieldsetLabel)) {
          const selectedOption = await fieldset.$(`${selectors.radioInput}[value='${value ? 'Yes' : 'No'}']`) as ElementHandle;
          await selectedOption.click();
        }
      }
    }
  }

  // Fill checkboxes
  const checkboxes = await page.$$(selectors.checkbox) as ElementHandle<HTMLInputElement>[];

  for (const checkbox of checkboxes) {
    const checkboxId = await checkbox.evaluate(el => el.id);
    const checkboxLabel = await page.$eval(`label[for="${checkboxId}"]`, el => el.innerText);

    for (const [labelRegex, value] of Object.entries(booleans)) {
      if (new RegExp(labelRegex, 'i').test(checkboxLabel)) {
        const currentCheckedState = await checkbox.evaluate(el => el.checked);

        if (currentCheckedState !== value) {
          await checkbox.click();
        }
      }
    }
  }

  // Fill select fields (2-option selects)
  const selectElements = await page.$$(selectors.select);

  for (const select of selectElements) {
    const selectOptions = await select.$$(selectors.option);
    selectOptions.shift(); // Remove default or first placeholder option

    if (selectOptions.length === 2) {
      const selectId = await select.evaluate(el => el.id);
      const selectLabel = await page.$eval(`label[for="${selectId}"]`, el => el.innerText);

      for (const [labelRegex, value] of Object.entries(booleans)) {
        if (new RegExp(labelRegex, 'i').test(selectLabel)) {
          const selectedOptionValue = await selectOptions[value ? 0 : 1].evaluate(el => (el as HTMLOptionElement).value);
          await select.select(selectedOptionValue);
          break;
        }
      }
    }
  }
}

export default fillBooleanFields;
