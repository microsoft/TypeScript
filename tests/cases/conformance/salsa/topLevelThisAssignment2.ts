// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: decl.d.ts
declare var module: { exports: any };
declare function require(name: string): any;
// @Filename: mod.js
/// <reference path='./decl.d.ts' />
module.exports = {};
this.a = 10;
this.a;     // ok
module.exports.a;  // should be ok but doesn't have the right type
a;          // error: not actually at top-level in a module

// @Filename: use.js
var mod = require('./mod')
mod.a;
