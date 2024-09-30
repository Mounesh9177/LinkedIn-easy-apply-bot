import { ElementHandle, Page } from 'puppeteer';

async function setTextInput(
  container: ElementHandle | Page, 
  selector: string, 
  value: string
): Promise<void> {
  // Find the input element
  const input = selector ? await container.$(selector) : (container as ElementHandle);

  if (!input) {
    throw new Error(`Element with selector "${selector}" not found`);
  }

  // Get the current value of the input element
  const currentValue = await input.evaluate((el) => (el as HTMLInputElement).value);

  // Only update if the current value is different from the new value
  if (currentValue !== value) {
    await input.focus(); // Focus on the input
    await input.click({ clickCount: 3 }); // Select the current text for overwriting
    await input.press('Backspace'); // Clear the existing text
    await input.type(value); // Type the new value
  }
}

export default setTextInput;
