// @checkJs: true
// @strict: true
// @declaration: true
// @outdir: out
// @filename: moduleExportAliasDuplicateAlias.js
exports.apply = undefined;
function a() { }
exports.apply()
exports.apply = a;
exports.apply()

// @filename: test.js
const { apply } = require('./moduleExportAliasDuplicateAlias')
apply()
