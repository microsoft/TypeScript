// @allowJs: true
// @filename: inheritdoctag.js
// @out: dummy79.js
/**
 * Parent class.
 * @class
 */
function Connection() {}

/**
 * Open the connection.
 * @virtual
 */
Connection.prototype.open = function() {};

/**
 * Close the connection.
 */
Connection.prototype.close = function() {};

/**
 * Read the specified number of bytes from the connection.
 *
 * @function Connection#read
 * @param {number} bytes - The number of bytes to read.
 * @return {Buffer} The bytes that were read.
 */
Connection.prototype.read = function(bytes) {};

/**
 * Child class.
 * @class
 * @extends Connection
 */
function Socket() {}

/** @inheritdoc */
Socket.prototype.open = function() {};

/**
 * Close the socket.
 * @param {string} message - A message explaining why the socket is being closed.
 * @inheritdoc
 */
Socket.prototype.close = function() {};

/** @inheritdoc */
Socket.prototype.read = function(bytes) {};
