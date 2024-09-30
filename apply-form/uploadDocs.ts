import { ElementHandle, Page } from 'puppeteer';
import selectors from '../selectors';

async function uploadDocuments(page: Page, cvFilePath: string, coverLetterFilePath: string): Promise<void> {
  // Get all document upload div elements
  const documentDivs = await page.$$(selectors.documentUpload);

  for (const documentDiv of documentDivs) {
    const label = await documentDiv.$(selectors.documentUploadLabel) as ElementHandle<HTMLElement>;
    const input = await documentDiv.$(selectors.documentUploadInput) as ElementHandle<HTMLInputElement>;

    const labelText = await label.evaluate((el) => el.innerText.trim());

    // Check label text to determine which file to upload
    if (labelText.includes('resume')) {
      await input.uploadFile(cvFilePath);
    } else if (labelText.includes('cover')) {
      await input.uploadFile(coverLetterFilePath);
    }
  }
}

export default uploadDocuments;
