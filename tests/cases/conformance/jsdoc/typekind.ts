// @allowJs: true
// @filename: typekind.js
// @out: dummy171.js
/**
    @module {ConnectServer} blog/server
*/

module.exports = require('connect').createServer(
  Connect.logger(),
  Connect.conditionalGet(),
  Connect.favicon(),
  Connect.cache(),
  Connect.gzip(),
  require('wheat')(__dirname)
);

/**
    @member {number} module:blog/server.port
    @default 8080
*/