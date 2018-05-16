/**
 * Modules
 */

var path = require('path')
var cachedPathRelative = require('.')

/**
 * Install shim
 */

path.relative = cachedPathRelative
