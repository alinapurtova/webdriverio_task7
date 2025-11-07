import HomePage from '../pageobjects/home.page.js';
import { browser } from '@wdio/globals';

describe('Cookie Banner tests', () => {
    it('TC-008: Verify cookie banner appears and can be accepted', async () => {
        await HomePage.open();
        await expect($(HomePage.cookieBanner)).toBeDisplayed();
        await HomePage.verifyCookieBannerAppearsAndCanBeAccepted();
    });

    it('TC-009: Verify cookie banner can be set up individually', async () => {
        await browser.reloadSession();
        await browser.setWindowSize(1400, 800);
        await HomePage.open();
        await HomePage.verifyCookieBannerCanBeSetUpIndividually();
        await expect($(HomePage.cookieBanner)).not.toBeDisplayed();
    });

});