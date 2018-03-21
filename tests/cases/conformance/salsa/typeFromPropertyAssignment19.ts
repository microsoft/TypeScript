// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: semver.js
exports = module.exports = C
C.f = n => n + 1
function C() {
    this.p = 1
}
// @filename: index.js
const C = require("./semver")
var two = C.f(1)
