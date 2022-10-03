// @allowJs: true
// @checkJs: true
// @target: es5
// @lib: es6
// @outDir: ./out
// @declaration: true
// @filename: index.js
const m = require("./exporter");

module.exports = m.default;
module.exports.memberName = "thing";

// @filename: exporter.js
function validate() {}

export default validate;
