// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: mod.js
module.exports = function x() { }
module.exports() // should be callable

// @Filename: npm.js
var mod = require('./mod')
mod() // should be callable from here too
