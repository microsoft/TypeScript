// @allowJs: true
// @noEmit: true
// @checkJs: true
// @target: esnext
// @module: esnext
// @Filename: bug28014.js
exports.version = 1
function alias() { }
module.exports = alias

// @Filename: importer.js
import('./bug28014')
