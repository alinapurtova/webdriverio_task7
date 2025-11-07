import Page from './page.js';
import { $, $$, expect, browser } from '@wdio/globals';

class RcsPage extends Page {
    url = '/products/rcs';
    faqSection = 'section.pt-xxl.bg-transparent';
    faqQuestions = 'section.pt-xxl.bg-transparent button[data-state]';
    faqAnswers = 'section.pt-xxl.bg-transparent p';

    async openPage() {
        await this.open(this.url);
        await this.isUrlContains(this.url);
    }

    async isOnPage() {
        await this.isUrlContains(this.url);
    }

    async verifyFaqSectionVisible() {
        const faqBlock = $(this.faqSection);
        await faqBlock.waitForDisplayed({ timeout: 10000 });
        await faqBlock.scrollIntoView();
        await expect(faqBlock).toBeDisplayed();
    }

    async verifyFirstQuestionOpened() {
        const questions = await $$(this.faqQuestions);
        await expect(questions.length).toBeGreaterThan(0);

        const firstQuestion = questions[0];
        const isOpened = await firstQuestion.getAttribute('aria-expanded');
        await expect(isOpened).toBe('true');
        await firstQuestion.waitForClickable({ timeout: 5000 });
        await browser.pause(500);
        await firstQuestion.click();
    }

    async verifyFaqToggle() {
        const questions = $$(this.faqQuestions);
        for (let i = 1; i < questions.length; i++) {
            const question = questions[i];
            await question.scrollIntoView({ block: 'center' });
            await browser.pause(500);
            await question.waitForClickable({ timeout: 5000 });
            await question.click();

            await browser.pause(1000);
            const isOpened = await question.getAttribute('aria-expanded');
            await expect(isOpened).toBe('true');

            const prev = questions[i - 1];
            const wasPrevOpened = await prev.getAttribute('aria-expanded');
            await expect(wasPrevOpened).toBe('false');
        }
    }
}

export default new RcsPage();