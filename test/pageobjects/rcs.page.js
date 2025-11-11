import Page from './page.js';
import { expect, browser } from '@wdio/globals';

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
        await this.waitForDisplayed(this.faqSection, 10000);
        await this.scrollIntoView(this.faqSection);
        await this.isVisible(this.faqSection);
    }

    async verifyFirstQuestionOpened() {
        const questions = await this.getElements(this.faqQuestions);
        await expect(questions.length).toBeGreaterThan(0);

        const firstQuestion = questions[0];
        await firstQuestion.waitForClickable({ timeout: 5000 });
        await firstQuestion.click();

        await browser.waitUntil(
            async () => (await firstQuestion.getAttribute('aria-expanded')) === 'true',
            {
                timeout: 5000,
                timeoutMsg: 'First question did not open within 5s'
            }
        );
    }


    async verifyFaqToggle() {
        const questions = await this.getElements(this.faqQuestions);

        for (let i = 1; i < questions.length; i++) {
            const question = questions[i];
            await question.scrollIntoView({ block: 'center' });
            await question.waitForClickable({ timeout: 5000 });
            await question.click();

            await browser.waitUntil(
                async () => (await question.getAttribute('aria-expanded')) === 'true',
                {
                    timeout: 5000,
                    timeoutMsg: `Question ${i + 1} did not open in time`
                }
            );

            const prev = questions[i - 1];
            await browser.waitUntil(
                async () => (await prev.getAttribute('aria-expanded')) === 'false',
                {
                    timeout: 5000,
                    timeoutMsg: `Previous question ${i} did not close in time`
                }
            );
        }
    }
}

export default new RcsPage();