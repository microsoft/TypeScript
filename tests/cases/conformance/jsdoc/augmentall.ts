// @allowJs: true
// @filename: augmentall.js
// @out: dummy14.js
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
 * Child class.
 * @class
 * @implements {Connection}
 */
function Socket() {}

/** @inheritdoc */
Socket.prototype.open = function() {};

/**
 * Extension of child class.
 * @class
 * @extends {Socket}
 */
function EncryptedSocket() {}
