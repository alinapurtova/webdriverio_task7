const base = require('./wdio.conf.js');
exports.config = {
    ...base.config,
    services: [],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless']
        }
    }]
};