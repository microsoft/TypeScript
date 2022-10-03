// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: mod.js
// Based on a pattern from adonis
exports.formatters = {}
// @Filename: first.js
exports = require('./mod')
exports.formatters.j = function (v) {
    return v
}
// @Filename: second.js
exports = require('./mod')
exports.formatters.o = function (v) {
    return v
}

// @Filename: use.js
import * as debug from './mod'

debug.formatters.j
var one = debug.formatters.o(1)
