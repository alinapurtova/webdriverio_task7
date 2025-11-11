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
        await element.click();
    }

    async getElements(selector) {
        return await $$(selector);
    }

    async waitForDisplayed(selector, timeout = 10000) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout });
    }

    async scrollIntoView(selector) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        await element.scrollIntoView();
    }

    async setValue(selector, value) {
        const element = await browser.$(selector);
        await element.setValue(value);
    }

    async switchFrame(selector) {
        const element = await $(selector);
        await element.waitForExist({ timeout: 10000 });
        await element.scrollIntoView();
        await browser.switchFrame(element);
    }

    async isExisting(selector) {
        const element = await browser.$(selector);
        return await element.isExisting();
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