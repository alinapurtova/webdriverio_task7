import GlobalCoveragePage from '../pageobjects/globalCoverage.page.js';
import { faker } from '@faker-js/faker';

const invalidEmails = [
    'invalid-email',
    'testuser luxequality@gmail.com',
    'еуіегіуккутеяшдф',
    'testuserluxequalitygmail.com',
    'testuserluxequality@gmailcom',
    'testuserluxequality@gmail',
    'testuserluxequality@.com',
    'testuserluxequality',
    'testuserluxequality@@gmail.com'
];
const filterCountry1 = "Albania";
const filterCountry2 = "Angola";
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const email = faker.internet.email();

describe('GlobalCoverage page tests', () => {

    beforeEach(async () => {
        await GlobalCoveragePage.openPage();
        await GlobalCoveragePage.isOnPage();
    });

    it('TC-018: Verify filtering Global Coverage table by country', async () => {
        await expect($(GlobalCoveragePage.coverageTable)).toBeDisplayed();
        await expect($(GlobalCoveragePage.servicesButton)).toBeDisplayed();
        await GlobalCoveragePage.selectCountry(filterCountry1);
        await GlobalCoveragePage.verifyTableContainsOnlyCountry(filterCountry1);
    });

    it('TC-019: Verify validation of reset button after filter Global Coverage table', async () => {
        await expect($(GlobalCoveragePage.coverageTable)).toBeDisplayed();
        await GlobalCoveragePage.selectCountry(filterCountry2);
        await GlobalCoveragePage.verifyTableContainsOnlyCountry(filterCountry2);
        await GlobalCoveragePage.resetFilterAndVerify();
    });

    invalidEmails.forEach((email) => {
        it(`TC-021: Submit "Download full coverage" form with invalid email`, async () => {
            await GlobalCoveragePage.fillFirstName(firstName);
            await GlobalCoveragePage.fillLastName(lastName);
            await GlobalCoveragePage.fillEmail(email);
            await GlobalCoveragePage.clickSubmitButton();

            await expect($(GlobalCoveragePage.emailError)).toBeDisplayed();
        });
    });

    it('TC-020: Submit "Download full coverage" form with valid data', async () => {
        await expect($(GlobalCoveragePage.form)).toBeDisplayed();
        await GlobalCoveragePage.fillFirstName(firstName);
        await GlobalCoveragePage.fillLastName(lastName);
        await GlobalCoveragePage.fillEmail(email);
        await GlobalCoveragePage.clickSubmitButton();
        await GlobalCoveragePage.verifyThankYouPage();
    });
});