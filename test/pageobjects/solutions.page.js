import Page from './page.js';
import { expect, browser } from '@wdio/globals';

class SolutionsPage extends Page {
    url = '/solutions';
    searchInput = 'input[placeholder*="Search"]';
    solutionTitles = '#use-cases h3';

    async openPage() {
        await this.open(this.url);
        await this.isUrlContains(this.url);
    }

    async searchForKeyword(keyword) {
        await this.scrollIntoView(this.searchInput);
        await this.setValue(this.searchInput, keyword);
        await browser.keys('Enter');

        await browser.waitUntil(
            async () => {
                const results = await this.getElements(this.solutionTitles);
                return results.length > 0;
            },
            {
                timeout: 10000,
                timeoutMsg: `No solutions found for keyword: ${keyword}`
            }
        );

        await browser.waitUntil(
            async () => {
                const results = await this.getElements(this.solutionTitles);
                if (results.length === 0) return false;
                const firstText = await results[0].getText();
                return firstText.toLowerCase().includes(keyword.toLowerCase());
            },
            {
                timeout: 10000,
                timeoutMsg: `First result is not updated with keyword: ${keyword}`
            }
        );
    }


    async verifyResultsContainKeyword(keyword) {
        const results = await this.getElements(this.solutionTitles);
        await expect(results.length).toBeGreaterThan(0);

        for (const result of results) {
            const text = await result.getText();
            await expect(text.toLowerCase()).toContain(keyword.toLowerCase());
        }
    }
}

export default new SolutionsPage();