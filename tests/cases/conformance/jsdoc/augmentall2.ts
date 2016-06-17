// @allowJs: true
// @filename: augmentall2.js
// @out: dummy15.js
/**
 * Parent interface.
 * @interface
 */
function Connection() {}

/**
 * Open the connection.
 */
Connection.prototype.open = function() {};

/**
 * Child interface.
 * @interface
 * @extends {Connection}
 */
function Socket() {}

/**
 * Implementation of child interface.
 * @class
 * @implements {Socket}
 */
function EncryptedSocket() {}

/** @inheritdoc */
EncryptedSocket.prototype.open = function() {};
