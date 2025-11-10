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

describe('GlobalCoverage page tests', () => {

    beforeEach(async () => {
        await GlobalCoveragePage.openPage();
        await GlobalCoveragePage.isOnPage();
    });

    it('TC-018: Verify filtering Global Coverage table by country', async () => {
        const filterCountry = "Albania";

        await expect($(GlobalCoveragePage.coverageTable)).toBeDisplayed();
        await expect($(GlobalCoveragePage.servicesButton)).toBeDisplayed();
        await GlobalCoveragePage.selectCountry(filterCountry);
        await GlobalCoveragePage.verifyTableContainsOnlyCountry(filterCountry);
    });

    it('TC-019: Verify validation of reset button after filter Global Coverage table', async () => {
        const filterCountry = "Angola";

        await expect($(GlobalCoveragePage.coverageTable)).toBeDisplayed();
        await GlobalCoveragePage.selectCountry(filterCountry);
        await GlobalCoveragePage.verifyTableContainsOnlyCountry(filterCountry);
        await GlobalCoveragePage.resetFilterAndVerify();
    });

    invalidEmails.forEach((email) => {
        it(`TC-021: Submit "Download full coverage" form with invalid email`, async () => {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();

            await GlobalCoveragePage.fillFirstName(firstName);
            await GlobalCoveragePage.fillLastName(lastName);
            await GlobalCoveragePage.fillEmail(email);
            await GlobalCoveragePage.clickSubmitButton();

            await expect($(GlobalCoveragePage.emailError)).toBeDisplayed();
        });
    });

    it('TC-020: Submit "Download full coverage" form with valid data', async () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();

        await expect($(GlobalCoveragePage.form)).toBeDisplayed();
        await GlobalCoveragePage.fillFirstName(firstName);
        await GlobalCoveragePage.fillLastName(lastName);
        await GlobalCoveragePage.fillEmail(email);
        await GlobalCoveragePage.clickSubmitButton();
        await GlobalCoveragePage.verifyThankYouPage();
    });
});