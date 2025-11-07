import Page from './page.js';

class ContactUsPage extends Page {
    url = '/contact-us';
    form = 'div[title="Contact us"] form';
    businessEmailInput = 'input[name="Email"]';
    howCanWeHelpSelect = 'select[id*="Reason_for_Contact"]';
    firstNameInput = '#FirstName';
    lastNameInput = '#LastName';
    phoneInput = 'input[name*="Phone_Number"]';
    companyWebsite = 'input[name="Website"]';
    hearAboutUs = 'input[id*="How_did_you_hear"]';

    async isOnPage() {
        await this.isUrlContains(this.url);
    }

    async verifyContactUsFormLoaded() {
        await this.isVisible(this.form);

        const fields = [
            this.businessEmailInput,
            this.howCanWeHelpSelect,
            this.firstNameInput,
            this.lastNameInput,
            this.phoneInput,
            this.companyWebsite,
            this.hearAboutUs
        ];

        for (const field of fields) {
            await this.isVisible(field);
        }
    }
}

export default new ContactUsPage();