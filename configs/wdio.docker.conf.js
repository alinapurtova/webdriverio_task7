import { config as baseConfig } from './wdio.conf.js';

export const config = {
    ...baseConfig,
    services: [], 
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--headless',
                    '--disable-gpu',
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--window-size=1400,800',
                ],
            },
        },
    ],
    reporters: [
        ['spec', { showPreface: false }],
        ['allure', { outputDir: '../allure-results', disableWebdriverStepsReporting: true }],
    ],
};