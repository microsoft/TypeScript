// https://github.com/microsoft/TypeScript/issues/34481

// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /a.js
const alias = {};
module.exports = alias;

// @Filename: /b.js
import a from "./a";
