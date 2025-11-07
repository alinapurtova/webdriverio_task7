import Page from './page.js';
import { $ } from '@wdio/globals';

class ChatPage extends Page {
    chatButton = 'button.relative.rounded-full';
    chatWindow = 'div.rounded-xl.fixed .cursor-default';
    chatInput = '#user-message-input';
    closeButton = 'span.cursor-pointer';

    async openChatWidget() {
        await this.isVisible(this.chatButton);
        await $(this.chatButton).scrollIntoView();
        await this.click(this.chatButton);
    }

    async verifyChatOpened() {
        await this.isVisible(this.chatWindow);
        await this.isVisible(this.chatInput);
    }

    async closeChatWidget() {
        await this.isVisible(this.closeButton);
        await this.click(this.closeButton);
    }

    async verifyChatClosed() {
        await this.isHidden(this.chatWindow);
    }
}

export default new ChatPage();