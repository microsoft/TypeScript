// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: requires.d.ts
declare var module: { exports: any };
declare function require(name: string): any;
// @Filename: mod1.js
/// <reference path='./requires.d.ts' />
module.exports = function () { }
/** @param {number} a */
module.exports.f = function (a) { }

// @Filename: a.js
/// <reference path='./requires.d.ts' />
var mod1 = require('./mod1')
mod1()
mod1.f() // error, not enough arguments
