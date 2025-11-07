const base = require('./wdio.conf.js');
exports.config = {
  ...base.config,
  capabilities: [{ browserName: 'MicrosoftEdge' }]
};