import Page from './page.js';
import { $, browser } from '@wdio/globals';

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
        const iframe = $(this.vimeoIframe);
        await browser.pause(5000); 
        await iframe.waitForExist({ timeout: 10000 });
        await iframe.scrollIntoView();
        await browser.switchFrame(iframe);

        const playButton = $(this.playButton);
        await playButton.scrollIntoView();
        if (await playButton.isExisting()) {
            await playButton.waitForClickable({ timeout: 5000 });
            await playButton.click();
        }
        await browser.pause(3000); 
        await browser.switchToParentFrame();
    }
}

export default new LivepersonPage();