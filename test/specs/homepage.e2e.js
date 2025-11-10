import HomePage from '../pageobjects/home.page.js';
import ChatPage from '../pageobjects/chatWidget.page.js';
import { faker } from '@faker-js/faker';

describe('HomePage features tests', () => {
    beforeEach(async () => {
        await HomePage.open();
    });

    it('TC-013: Verify that the chat/contact widget appears and closes correctly', async () => {
        await ChatPage.openChatWidget();
        await ChatPage.verifyChatOpened();
        await ChatPage.closeChatWidget();
        await expect(await $(ChatPage.chatWindow)).not.toBeDisplayed({ wait: 10000 });
    });

    it('TC-014: Verify "Call your agent" button scrolls to the interactive tool demo section', async () => {
        await HomePage.verifyCallYourAgentScrollsToDemo();
        await expect($(HomePage.interactiveToolDemoSection)).toBeDisplayed();
    });

    it('TC-015: Verify the "Text To Speech" functionality', async () => {
        await HomePage.verifyTextToSpeechTabWorks();
        await expect($(HomePage.textToSpeechContent)).toBeDisplayed();
    });

    it('TC-016: Verify that the “Text to Speech” audio can be played', async () => {
        const randomText = faker.lorem.sentence();

        await HomePage.verifyTextToSpeechTabWorks();
        await HomePage.enterTextForSpeech(randomText);
        await HomePage.playGeneratedSpeech();
        await expect(await $(HomePage.playAudioButton).getAttribute('aria-label')).toBe('Stop audio');
    });
});