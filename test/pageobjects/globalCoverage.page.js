import Page from './page.js';
import { $, expect, browser } from '@wdio/globals';

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
        await this.scrollIntoView(this.filterDropdown);
        await this.click(this.filterDropdown);
        await this.scrollIntoView(this.countryOption(country));
        await this.click(this.countryOption(country));
        await this.click(this.filterDropdown);
    }

    async verifyTableContainsOnlyCountry(country) {
        const rows = await this.getElements(this.tableRows);
        await expect(rows).toBeElementsArrayOfSize(1);
        const text = await rows[0].getText();
        await expect(text).toContain(country);
    }

    async resetFilterAndVerify() {
        await this.scrollIntoView(this.resetFilterButton);
        await this.click(this.resetFilterButton);

        await browser.waitUntil(async () => {
            const rows = await this.getElements(this.tableRows);
            return rows.length > 1;
        }, {
            timeout: 10000,
            timeoutMsg: 'Table did not reset properly',
        });

        const rows = await this.getElements(this.tableRows);
        await expect(rows.length).toBeGreaterThan(1);
    }

    async fillFirstName(name) {
        await this.setValue(this.firstNameField, name);
    }

    async fillLastName(name) {
        await this.setValue(this.lastNameField, name);
    }

    async fillEmail(email) {
        await this.setValue(this.emailField, email);
    }

    async clickSubmitButton() {
        await this.click(this.submitButton);
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