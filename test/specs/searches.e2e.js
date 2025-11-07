import RcsPage from '../pageobjects/rcs.page.js';
import SolutionsPage from '../pageobjects/solutions.page.js';
import ResourcesPage from '../pageobjects/resources.page.js';
import { expect } from '@wdio/globals';

describe('Searches and FAQ features tests', () => {
    it('TC-010: Verification of the search functionality on the All Solutions page', async () => {
        const keywords = ['IoT', 'sms'];

        await SolutionsPage.openPage();
        await expect(await browser.getUrl()).toContain(SolutionsPage.url);
        for (const keyword of keywords) {
            await SolutionsPage.searchForKeyword(keyword);
            await browser.pause(2000);
            await SolutionsPage.verifyResultsContainKeyword(keyword);

            await browser.pause(2000);
        }
    });

    it('TC-011: Verify search bar returns results for a keyword', async () => {
        const keyword = "sms";

        await ResourcesPage.openPage();
        await expect(await browser.getUrl()).toContain(ResourcesPage.url);
        await ResourcesPage.searchForKeyword(keyword);
        await browser.pause(2000);
        await ResourcesPage.verifySearchResults(keyword);
    });

    it('TC-012: Verify FAQ section functionality on the RCS page', async () => {
        await RcsPage.openPage();
        await expect(await browser.getUrl()).toContain(RcsPage.url);
        await RcsPage.verifyFaqSectionVisible();
        await RcsPage.verifyFirstQuestionOpened();
        await RcsPage.verifyFaqToggle();
    });
});