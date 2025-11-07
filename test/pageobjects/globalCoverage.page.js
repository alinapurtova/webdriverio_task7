import Page from './page.js';
import { $, $$, expect, browser } from '@wdio/globals';

class GlobalCoveragePage extends Page {
    url = '/global-coverage';
    coverageTable = 'div[id*="services"] table';
    filterDropdown = 'div[id*="services"] button[aria-haspopup="menu"]';
    countryOption = (country) => `input[name="${country}"]`;
    tableRows = 'div[id*="services"] table tbody tr';
    servicesButton = 'button[id*="services"]';
    resetFilterButton = "form > button";
    form = "div form.mktoForm";
    firstNameField = 'input[name="FirstName"]';
    lastNameField = 'input[name="LastName"]';
    emailField = 'input[name="Email"]';
    submitButton = 'button[type="submit"]';
    emailError = 'div.mktoError';
    urlThankYou = '/thank-you';

    async openPage() {
        await this.open(this.url);
    }

    async isOnPage() {
        await this.isUrlContains(this.url);
    }

    async selectCountry(country) {
        const filter = await $(this.filterDropdown);
        await filter.scrollIntoView();
        await filter.waitForClickable({ timeout: 5000 });
        await filter.click();

        const option = await $(this.countryOption(country));
        await option.waitForExist({ timeout: 5000 });
        await option.scrollIntoView();
        await option.click();
        await filter.click();
        await browser.pause(1500);
    }

    async verifyTableContainsOnlyCountry(country) {
        const rows = await $$(this.tableRows);
        await expect(rows).toBeElementsArrayOfSize(1);
        const text = await rows[0].getText();
        await expect(text).toContain(country);
    }

    async resetFilterAndVerify() {
        const reset = await $(this.resetFilterButton);
        await reset.waitForClickable({ timeout: 5000 });
        await reset.scrollIntoView();
        await reset.click();

        await browser.waitUntil(async () => {
            const rows = await $$(this.tableRows);
            return rows.length > 1;
        }, {
            timeout: 10000,
            timeoutMsg: 'Table did not reset properly',
        });

        const rows = await $$(this.tableRows);
        await expect(rows.length).toBeGreaterThan(1);
    }

    async fillFirstName(name) {
        await $(this.firstNameField).setValue(name);
    }

    async fillLastName(name) {
        await $(this.lastNameField).setValue(name);
    }

    async fillEmail(email) {
        await $(this.emailField).setValue(email);
    }

    async clickSubmitButton() {
        await $(this.submitButton).click();
    }

    async getEmailErrorText() {
        return await $(this.emailError).getText();
    }

    async verifyThankYouPage() {
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(this.urlThankYou),
            {
                timeout: 15000,
                timeoutMsg: 'Expected redirect to /thank-you after form submission'
            }
        );
        const thankYouHeader = await $('h1');
        await thankYouHeader.waitForDisplayed({ timeout: 10000 });

        const headerText = await thankYouHeader.getText();
        await expect(headerText.trim()).toEqual('Thank you.');
    }
}

export default new GlobalCoveragePage();