// @allowJs: true
// @filename: augmentstag6.js
// @out: dummy21.js
'use strict';

/** @interface */
function IConnection() {}

/** Open the connection. */
IConnection.prototype.open = function() {};

/**
 * @interface
 * @extends {IConnection}
 */
function IClosableConnection() {}

/** Close the connection. */
IClosableConnection.prototype.close = function() {};
