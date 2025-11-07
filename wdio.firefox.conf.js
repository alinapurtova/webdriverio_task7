const base = require('./wdio.conf.js');
exports.config = {
  ...base.config,
  capabilities: [{
    browserName: 'firefox',
    'moz:firefoxOptions': { args: ['--headless'] }
  }]
};