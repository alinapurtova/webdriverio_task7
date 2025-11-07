import Page from './page.js';
import { $, expect, browser } from '@wdio/globals';

class ResourcesPage extends Page {
    url = '/resources';
    searchInput = 'input[name="search"]';
    searchResults = 'ul.grid li';

    async openPage() {
        await this.open(this.url);
    }

    async searchForKeyword(keyword) {
        const input = await $(this.searchInput);
        await input.waitForDisplayed({ timeout: 10000 });
        await input.setValue(keyword);
        await browser.keys('Enter');
    }

    async verifySearchResults(keyword) {
        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain(`/search?s=${keyword}`);

        const results = await $$(this.searchResults);
        await expect(results.length).toBeGreaterThan(0);

        const firstResult = results[0];
        await firstResult.scrollIntoView();
        const firstResultText = await firstResult.getText();
        await expect(firstResultText.toLowerCase()).toContain(keyword.toLowerCase());
    }
}

export default new ResourcesPage();