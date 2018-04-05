// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: mod1.js
// TODO: Test that this is not legal (or at least doesn't work) if module.exports is a primitive
module.exports = function () { }
module.exports.f = function () { }

// @Filename: a.js
var mod1 = require('./mod1')
mod1()
mod1.f()
