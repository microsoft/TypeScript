// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: npmlog.js
class EE {
    /** @param {string} s */
    on(s) { }
}
var npmlog = module.exports = new EE()

npmlog.on('hi') // both references should see EE.on
module.exports.on('hi') // here too

npmlog.x = 1
module.exports.y = 2
npmlog.y
module.exports.x

// @Filename: use.js
var npmlog = require('./npmlog')
npmlog.x
npmlog.on
