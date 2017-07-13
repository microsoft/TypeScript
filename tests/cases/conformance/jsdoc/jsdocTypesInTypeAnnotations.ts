// @allowJs: true
// @checkJs: true
// @noEmit: true
// @module: commonjs
// @filename: node.d.ts
// @noImplicitAny: true
declare function require(id: string): any;
declare var module: any, exports: any;

// @filename: f.js
var F = function () {
    this.x = 1;
};

function f(p: F) { p.x; }

// @filename: normal.ts
class C { p: number }

/** @param {C} p */
function g(c) { return c.p }

