import Page from './page.js';
import { $, $$, expect } from '@wdio/globals';

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
        const messages = await $$(this.errors);
        for (const element of messages) {
            await element.waitForDisplayed();
            await expect(element).toBeDisplayed();
        }
    }

    async verifyFormIsVisible() {
        const form = await $(this.signUpForm);
        await form.waitForDisplayed({ timeout: 10000 });
        await expect(form).toBeDisplayed();
    }

    async verifyPromoLinkVisible() {
        const promoLink = await $(this.promoLink);
        await promoLink.waitForDisplayed({ timeout: 10000 });
        await expect(promoLink).toBeDisplayed();
    }

    async verifyPromoFieldNotVisible() {
        const promoField = await $(this.promoInput);
        const isDisplayed = await promoField.isDisplayed();
        await expect(isDisplayed).toBe(false);
    }

    async clickPromoLink() {
        const promoLink = await $(this.promoLink);
        await promoLink.scrollIntoView();
        await promoLink.click();
    }

    async verifyPromoFieldAppears() {
        const promoInput = await $(this.promoInput);
        await promoInput.waitForDisplayed({ timeout: 5000 });
        await expect(promoInput).toBeDisplayed();
        await expect(promoInput).toBeEnabled();
    }
}

export default new SignUpPage();