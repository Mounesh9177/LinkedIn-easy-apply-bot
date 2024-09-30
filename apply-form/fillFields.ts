import { Page } from 'puppeteer';

import handleMultipleChoiceFields from './handleMultipleChoiceFields';
import handleBooleanFields from './handleBooleanFields';
import handleTextFields from './handleTextFields';
import setHomeCity from './setHomeCity';
import setPhoneNumber from './setPhoneNumber';
import deselectFollowCompany from './deselectFollowCompany';
import uploadDocuments from './uploadDocuments';
import { ApplicationFormData } from '../apply';

const handleError = () => {};

async function populateFormFields(page: Page, formData: ApplicationFormData): Promise<void> {
  // Insert home city and phone details
  await setHomeCity(page, formData.homeCity).catch(handleError);
  await setPhoneNumber(page, formData.phone).catch(handleError);

  // Deselect "Follow Company" checkbox
  await deselectFollowCompany(page);

  // Upload CV and cover letter documents
  await uploadDocuments(page, formData.cvPath, formData.coverLetterPath).catch(handleError);

  // Handle text-based fields
  const textInputs = {
    ...formData.textFields,
    ...formData.yearsOfExperience,
  };
  await handleTextFields(page, textInputs).catch(console.error);

  // Handle boolean-based fields
  const booleanFields = {
    ...formData.booleans,
    sponsorship: formData.requiresVisaSponsorship,
  };
  await handleBooleanFields(page, booleanFields).catch(console.error);

  // Handle multiple-choice fields
  const multiChoiceInputs = {
    ...formData.languageProficiency,
    ...formData.multipleChoiceFields,
  };
  await handleMultipleChoiceFields(page, multiChoiceInputs).catch(console.error);
}

export default populateFormFields;
