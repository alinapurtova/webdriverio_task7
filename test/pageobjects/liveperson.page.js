import Page from './page.js';
import { browser } from '@wdio/globals';

class LivepersonPage extends Page {
    url = '/customer-stories/liveperson';
    vimeoIframe = 'iframe[src*="player.vimeo.com"]';
    playButton = 'button[data-play-button="true"]';
    videoElement = 'video';

    async openPage() {
        await this.open(this.url);
    }

    async isOnPage() {
        await this.isUrlContains(this.url);
    }

    async verifyVideoVisible() {
        await this.isVisible(this.vimeoIframe);
    }

    async playVideo() {
        await this.switchFrame(this.vimeoIframe);
        if (await this.isExisting(this.playButton)) {
            await this.click(this.playButton);
        }
        await browser.switchToParentFrame();
    }
}

export default new LivepersonPage();