// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strict: true
// @target: es6
// @filename: lateBoundAssignmentDeclarationSupport7.js
const _sym = Symbol();
const _str = "my-fake-sym";

function F() {
}
F[_sym] = "ok";
F[_str] = "ok";
module.exports.F = F;
module.exports.S = _sym;
// @filename: usage.js
const x = require("./lateBoundAssignmentDeclarationSupport7.js");
const y = x.F["my-fake-sym"];
const z = x.F[x.S];
