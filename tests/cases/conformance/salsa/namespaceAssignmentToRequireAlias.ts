// @allowJs: true
// @checkJs: true
// @strict: true
// @outDir: out
// @declaration: true
// @filename: node_modules/untyped/index.js
module.exports = {}

// @filename: bug40140.js
const u = require('untyped');
u.assignment.nested = true
u.noError()

