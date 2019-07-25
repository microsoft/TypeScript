// @allowJs: true
// @noEmit: true
// @strict: true
// @checkJs: true
// @filename: mod1.js
exports.a = { x: "x" };
exports["b"] = { x: "x" };
exports["default"] = { x: "x" };
module.exports["c"] = { x: "x" };

// @filename: mod2.js
const mod1 = require("./mod1");
mod1.a;
mod1.b;
mod1.c;
mod1.default;
