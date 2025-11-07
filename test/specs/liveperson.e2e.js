import { expect, browser } from '@wdio/globals';
import LivepersonPage from '../pageobjects/liveperson.page.js';

describe('Liveperson video test', () => {
    it('TC-017: Verify video playback functionality on the Liveperson Customer Story page', async () => {
        await LivepersonPage.openPage();
        await LivepersonPage.isOnPage();
        await expect(await browser.getUrl()).toContain(LivepersonPage.url);
        await LivepersonPage.verifyVideoVisible();
        await LivepersonPage.playVideo();
    });
});