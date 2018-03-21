// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: minimatch.js
module.exports = minimatch
minimatch.M = M
minimatch.filter = filter
function filter() {
    return minimatch()
}
function minimatch() {
}
M.defaults = function (def) {
    return def
}
M.prototype.m = function () {
}
function M() {
}

// @Filename: use.js
var mini = require('./minimatch')
mini.M.defaults()
var m = new mini.M()
m.m()
mini.filter()
