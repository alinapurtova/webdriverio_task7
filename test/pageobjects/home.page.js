import Page from './page.js';
import { expect, browser } from '@wdio/globals';

class HomePage extends Page {
    pricingLink = '#main-menu-content button:nth-child(3)';
    pricingButton = 'a[class*="button"][href="/pricing"]'
    contactUsLink = 'header a[href*="/contact-us"]:nth-child(1)';
    signUpButton = 'header a[href="/sign-up"]';
    loginButton = 'header a[href*="/portal"]:nth-child(2)';
    cookieBanner = '#onetrust-banner-sdk > div';
    acceptCookiesButton = '#onetrust-accept-btn-handler';
    cookieSettingsButton = '#onetrust-pc-btn-handler';
    cookieSettingsWindow = 'div[aria-describedby="ot-pc-desc"]';
    cookieSettingsSwitches = 'span.ot-switch-nob';
    submitCookiesButton = 'button.save-preference-btn-handler';
    callYourAgentButton = 'a[href="#interactive-tool-demo"]';
    interactiveToolDemoSection = 'div[id*="content-hd-voice-ai"]';

    aiFeaturesSection = '#interactive-tool-demo';
    textToSpeechTab = 'button[aria-controls*="text-to-speech"]';
    textToSpeechContent = '#text-to-speech-textarea';
    playAudioButton = 'button[aria-label*="audio"]';
    textToSpeechTextarea = "#text-to-speech-textarea";

    footerSection = 'footer.pb-xxl';
    linkedinIcon = 'footer a[href*="linkedin"]';
    twitterIcon = 'footer a.link[href*="x.com"]';
    facebookIcon = 'footer a[href*="facebook"]';

    async navigateToPricing() {
        await this.click(this.pricingLink);
        await this.click(this.pricingButton);
    }

    async navigateToSignUp() {
        await this.click(this.signUpButton);
    }

    async navigateToContactUs() {
        await this.click(this.contactUsLink);
    }

    async navigateToLogin() {
        await this.click(this.loginButton);
    }

    async switchToNewTab() {
        const originalWindow = await browser.getWindowHandle();

        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1,
            {
                timeout: 5000,
                timeoutMsg: 'New tab did not open after clicking Log in'
            }
        );

        const allWindows = await browser.getWindowHandles();
        const newWindow = allWindows.find(w => w !== originalWindow);
        await browser.switchToWindow(newWindow);
    }

    async verifyCookieBannerAppearsAndCanBeAccepted() {
        await this.isVisible(this.cookieBanner);
        await this.click(this.acceptCookiesButton);
        await this.isHidden(this.cookieBanner);
    }

    async verifyCookieBannerCanBeSetUpIndividually() {
        await this.isVisible(this.cookieBanner);
        await this.click(this.cookieSettingsButton);

        const switches = await this.getElements(this.cookieSettingsSwitches);
        await expect(switches).toBeElementsArrayOfSize(3);

        for (const sw of switches) {
            const isChecked = await sw.getAttribute('aria-checked');
            if (isChecked === 'true') {
                await sw.click();
            }
            const newState = await sw.getAttribute('aria-checked');
            await expect(newState).toBe('false'); 
        }

        await this.click(this.submitCookiesButton);
        await this.isHidden(this.cookieBanner);
    }

    async verifyCallYourAgentScrollsToDemo() {
        await this.isVisible(this.callYourAgentButton);
        await this.click(this.callYourAgentButton);
        await this.isVisible(this.interactiveToolDemoSection);
    }

    async verifyTextToSpeechTabWorks() {
        await this.scrollIntoView(this.aiFeaturesSection)
        await this.isVisible(this.aiFeaturesSection);
        await this.click(this.textToSpeechTab);
        await this.isVisible(this.textToSpeechContent);
    }

    async enterTextForSpeech(text) {
        await this.waitForDisplayed(this.textToSpeechTextarea);
        await this.setValue(this.textToSpeechTextarea, text);
        const enteredText = await textarea.getValue();
        await expect(enteredText.trim()).toEqual(text.trim());
    }

    async playGeneratedSpeech() {
        const playBtn = await $(this.playAudioButton);
        await playBtn.waitForClickable({ timeout: 20000 });
        const beforeAttr = await playBtn.getAttribute('aria-label');
        await expect(beforeAttr).toBe('Play audio');
        await playBtn.click();
        await browser.pause(1500);
    }

    async scrollToFooter() {
        const footer = await $(this.footerSection);
        await footer.scrollIntoView();
        await expect(footer).toBeDisplayed();
    }

    async openSocialLink(selector) {
        const link = await $(selector);
        await link.waitForClickable({ timeout: 10000 });

        const originalWindows = await browser.getWindowHandles();
        const numOriginalWindows = originalWindows.length;

        await link.click();

        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > numOriginalWindows,
            { timeout: 7000, timeoutMsg: 'New tab did not open after clicking link' }
        );

        const allWindows = await browser.getWindowHandles();
        const newWindow = allWindows.find((handle) => !originalWindows.includes(handle));

        await browser.switchToWindow(newWindow);

        await browser.waitUntil(
            async () => (await browser.getUrl()).length > 0,
            { timeout: 7000, timeoutMsg: 'New tab did not load properly' }
        );
    }


    async closeCurrentTabAndReturn() {
        const allWindows = await browser.getWindowHandles();
        if (allWindows.length > 1) {
            await browser.closeWindow();
            await browser.switchToWindow(allWindows[0]);
        }
    }
    async verifyUrlContains(expectedPart, { timeout = 7000 } = {}) {
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(expectedPart),
            {
                timeout,
                timeoutMsg: `Expected URL to contain "${expectedPart}" within ${timeout} ms`
            }
        );

        expect(await browser.getUrl()).toContain(expectedPart);
    }

}

export default new HomePage();
