// @allowJs: true
// @strict: true
// @checkJs: true
// @emitDeclarationOnly: true
// @declaration: true
// @filename: mod1.js
exports.a = { x: "x" };
exports["b"] = { x: "x" };
exports["default"] = { x: "x" };
module.exports["c"] = { x: "x" };
module["exports"]["d"] = {};
module["exports"]["d"].e = 0;

// @filename: mod2.js
const mod1 = require("./mod1");
mod1.a;
mod1.b;
mod1.c;
mod1.d;
mod1.d.e;
mod1.default;