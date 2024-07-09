// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @declaration: true
// @filename: index.js
module.exports.a = function a() {}

module.exports.b = function b() {}
module.exports.b.cat = "cat";

module.exports.c = function c() {}
module.exports.c.Cls = class {}

/**
 * @param {number} a
 * @param {number} b
 * @return {string} 
 */
module.exports.d = function d(a, b) { return /** @type {*} */(null); }

/**
 * @template T,U
 * @param {T} a
 * @param {U} b
 * @return {T & U} 
 */
module.exports.e = function e(a, b) { return /** @type {*} */(null); }

/**
 * @template T
 * @param {T} a
 */
module.exports.f = function f(a) {
    return a;
}
module.exports.f.self = module.exports.f;

/**
 * @param {{x: string}} a
 * @param {{y: typeof module.exports.b}} b
 */
function g(a, b) {
    return a.x && b.y();
}

module.exports.g = g;

/**
 * @param {{x: string}} a
 * @param {{y: typeof module.exports.b}} b
 */
function hh(a, b) {
    return a.x && b.y();
}

module.exports.h = hh;

module.exports.i = function i() {}
module.exports.ii = module.exports.i;

// note that this last one doesn't make much sense in cjs, since exports aren't hoisted bindings
module.exports.jj = module.exports.j;
module.exports.j = function j() {}
