import HomePage from '../pageobjects/home.page.js';
import PricingPage from '../pageobjects/pricing.page.js';
import LoginPage from '../pageobjects/login.page.js';
import ContactUsPage from '../pageobjects/contactus.page.js';

describe('Navigation tests', () => {
    beforeEach(async () => {
        await HomePage.open();
    });

    it('TC-001 Verify user can navigate to the Pricing page from the header', async () => {
        await HomePage.navigateToPricing();
        await PricingPage.isOnPage();
        await expect(await $(PricingPage.header)).toBeExisting();
    });

    it('TC-002: Verify the Contact Us form is visible and functional', async () => {
        await HomePage.navigateToContactUs();
        await ContactUsPage.isOnPage();
        await expect(await $(ContactUsPage.form)).toBeExisting();
        await ContactUsPage.verifyContactUsFormLoaded();
    });

    it('TC-003: Verify that the Login form is displayed in new tab', async () => {
        await HomePage.navigateToLogin();
        await HomePage.switchToNewTab();
        await LoginPage.isOnPage();
        await expect($(LoginPage.loginForm)).toBeDisplayed();
        await LoginPage.verifyLoginFieldsVisible();
    });

    it('TC-004: Verify the social media links in the footer ', async () => {
        await HomePage.scrollToFooter();
        await expect($(HomePage.footerSection)).toBeDisplayed();

        await HomePage.openSocialLink(HomePage.linkedinIcon);
        await HomePage.isUrlContains('linkedin.com');
        await HomePage.closeCurrentTabAndReturn();

        await HomePage.openSocialLink(HomePage.twitterIcon);
        await HomePage.isUrlContains('x.com/telnyx');
        await HomePage.closeCurrentTabAndReturn();

        await HomePage.openSocialLink(HomePage.facebookIcon);
        await HomePage.isUrlContains('facebook.com/Telnyx');
        await HomePage.closeCurrentTabAndReturn();
    });
});