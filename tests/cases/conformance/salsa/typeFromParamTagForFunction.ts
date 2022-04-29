// @allowJs: true
// @checkJs: true
// @noEmit: true
// @module: commonjs
// @filename: node.d.ts
declare function require(id: string): any;
declare var module: any, exports: any;

// @filename: a-ext.js
exports.A = function () {
    this.x = 1;
};

// @filename: a.js
const { A } = require("./a-ext");

/** @param {A} p */
function a(p) { p.x; }

// @filename: b-ext.js
exports.B = class {
    constructor() {
        this.x = 1;
    }
};

// @filename: b.js
const { B } = require("./b-ext");

/** @param {B} p */
function b(p) { p.x; }

// @filename: c-ext.js
export function C() {
    this.x = 1;
}

// @filename: c.js
const { C } = require("./c-ext");

/** @param {C} p */
function c(p) { p.x; }

// @filename: d-ext.js
export var D = function() {
    this.x = 1;
};

// @filename: d.js
const { D } = require("./d-ext");

/** @param {D} p */
function d(p) { p.x; }

// @filename: e-ext.js
export class E {
    constructor() {
        this.x = 1;
    }
}

// @filename: e.js
const { E } = require("./e-ext");

/** @param {E} p */
function e(p) { p.x; }

// @filename: f.js
var F = function () {
    this.x = 1;
};

/** @param {F} p */
function f(p) { p.x; }

// @filename: g.js
function G() {
    this.x = 1;
}

/** @param {G} p */
function g(p) { p.x; }

// @filename: h.js
class H {
    constructor() {
        this.x = 1;
    }
}

/** @param {H} p */
function h(p) { p.x; }