// @target: es2015
// @strict: false
// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: mod.js
const util = exports = module.exports = {}
if (!!false) {
    util.exist = function () { }
}

// @Filename: use.js
const util = require('./mod')
function n() {
    util.exist // no error
}
util.exist // no error
