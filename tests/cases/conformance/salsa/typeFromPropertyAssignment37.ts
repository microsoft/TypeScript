// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: mod.js
const util = exports = module.exports = {}
if (!!false) {
    util.existy = function () { }
}

// @Filename: use.js
const util = require('./mod')
function n() {
    util.existy // no error
}
util.existy // no error
