// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: npm.js
var npm = module.exports = function (tree) {
}
module.exports.asReadInstalled = function (tree) {
    npm(tree) // both references should be callable
    module.exports(tree)
}
