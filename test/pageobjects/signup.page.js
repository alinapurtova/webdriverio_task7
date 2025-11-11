import Page from './page.js';
import { expect } from '@wdio/globals';

class SignUpPage extends Page {
    url = '/sign-up';
    signUpForm = 'form[aria-label="signup-form"]'
    companyEmailInput = 'input[name="email"]';
    firstNameInput = 'input[name="first_name"]';
    lastNameInput = 'input[name="last_name"]';
    passwordInput = 'input[name="password"]';
    policyCheckbox = 'input[name="terms_and_conditions"]';
    signUpButton = 'div[data-action="signup"] ~ button';
    errors = 'div[id$="_message"]';
    promoLink = 'form button[aria-hidden]';
    promoInput = 'input[name="promo_code"]';

    async openPage() {
        await this.open(this.url);
    }

    async isOnPage() {
        await this.isUrlContains(this.url);
    }

    async verifyFormLoaded() {
        const elements = [
            this.signUpForm,
            this.companyEmailInput,
            this.firstNameInput,
            this.lastNameInput,
            this.passwordInput,
            this.policyCheckbox
        ];

        for (const element of elements) {
            await this.isVisible(element);
        }
    }

    async submitEmptyForm() {
        await this.click(this.signUpButton);
    }

    async verifyErrorMessages() {
        const messages = await this.getElements(this.errors);
        for (const element of messages) {
            await element.waitForDisplayed();
            await expect(element).toBeDisplayed();
        }
    }

    async verifyFormIsVisible() {
        await this.isVisible(this.signUpForm);
    }

    async verifyPromoLinkVisible() {
        await this.isVisible(this.promoLink);
    }

    async verifyPromoFieldNotVisible() {
        await this.isHidden(this.promoInput);
    }

    async clickPromoLink() {
        await this.scrollIntoView(this.promoLink);
        await this.click(this.promoLink);
    }

    async verifyPromoFieldAppears() {
        await this.isVisible(this.promoInput);
    }
}

export default new SignUpPage();