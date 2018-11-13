// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: types.d.ts
declare var require: any;
declare var module: any;
// @Filename: semver.js
/// <reference path='./types.d.ts'/>
exports = module.exports = C
C.f = n => n + 1
function C() {
    this.p = 1
}
// @filename: index.js
/// <reference path='./types.d.ts'/>
const C = require("./semver")
var two = C.f(1)
