const dotenv = require('dotenv');
dotenv.config();

const env = process.env.ENV || 'dev';

const baseUrls = {
  dev: 'https://telnyx.com'
};

exports.config = {
    before: async function () {
        await browser.setWindowSize(1400, 900);
    },
    runner: 'local',
    specs: [
        '../test/specs/**/*.js'
    ],
    exclude: [
    ],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }, {
        browserName: 'firefox'
    }, {
        browserName: 'MicrosoftEdge'
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: baseUrls[env],
    waitforTimeout: 20000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [['allure', { outputDir: 'allure-results' }]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 180000
    },
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    }
}
