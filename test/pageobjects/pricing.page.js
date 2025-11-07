import Page from './page.js';

class PricingPage extends Page {
    url = '/pricing';
    header = 'h1=Pricing';

    async isOnPage() {
        await this.isUrlContains(this.url);
    }
}

export default new PricingPage();