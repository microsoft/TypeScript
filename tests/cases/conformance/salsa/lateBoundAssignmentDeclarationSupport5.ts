// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strict: true
// @target: es6
// @filename: lateBoundAssignmentDeclarationSupport5.js
// currently unsupported
const _sym = Symbol();
const _str = "my-fake-sym";

function F() {
}
F.prototype = {
    [_sym]: "ok",
    [_str]: "ok"
}
const inst =  new F();
const _y = inst[_str];
const _z = inst[_sym];
module.exports.F = F;
module.exports.S = _sym;
// @filename: usage.js
const x = require("./lateBoundAssignmentDeclarationSupport5.js");
const inst =  new x.F();
const y = inst["my-fake-sym"];
const z = inst[x.S];
