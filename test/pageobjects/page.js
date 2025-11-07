const { browser, expect } = require('@wdio/globals');

export default class Page {
    async open(path = '/') {
        await browser.url(path);
    }

    async isUrlContains(substring) {
        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain(substring);
    }

    async click(selector) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        // await expect(element).toBeClickable();
        await element.click();
    }

    async setValue(selector, text) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        await element.setValue(text);
    }

    async getText(selector) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        return await element.getText();
    }

    async isVisible(selector) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        await expect(element).toBeDisplayed();
    }

    async isHidden(selector) {
        const element = await $(selector);
        await element.waitForDisplayed({ reverse: true, timeout: 10000 });
        await expect(element).not.toBeDisplayed();
    }
}