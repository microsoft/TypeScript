//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsFunctionsCjs.ts] ////

//// [index.js]
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


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
export var a = function a() { };
module.exports.a = function a() { };
export var b = function b() { };
module.exports.b = function b() { };
module.exports.b.cat = "cat";
export var c = function c() { };
module.exports.c = function c() { };
module.exports.c.Cls = class {
};
/**
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
export var d = function d(a, b) { return /** @type {*} */ (null as ); };
/**
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
module.exports.d = function d(a, b) { return /** @type {*} */ null; };
/**
 * @template T,U
 * @param {T} a
 * @param {U} b
 * @return {T & U}
 */
export var e = function e(a, b) { return /** @type {*} */ (null as ); };
/**
 * @template T,U
 * @param {T} a
 * @param {U} b
 * @return {T & U}
 */
module.exports.e = function e(a, b) { return /** @type {*} */ null; };
/**
 * @template T
 * @param {T} a
 */
export var f = function f(a) {
    return a;
};
/**
 * @template T
 * @param {T} a
 */
module.exports.f = function f(a) {
    return a;
};
module.exports.f.self = module.exports.f;
/**
 * @param {{x: string}} a
 * @param {{y: typeof module.exports.b}} b
 */
function g(a, b) {
    return a.x && b.y();
}
export var g = g;
module.exports.g = g;
/**
 * @param {{x: string}} a
 * @param {{y: typeof module.exports.b}} b
 */
function hh(a, b) {
    return a.x && b.y();
}
export var h = hh;
module.exports.h = hh;
export var i = function i() { };
module.exports.i = function i() { };
export var ii = module.exports.i;
module.exports.ii = module.exports.i;
// note that this last one doesn't make much sense in cjs, since exports aren't hoisted bindings
export var jj = module.exports.j;
// note that this last one doesn't make much sense in cjs, since exports aren't hoisted bindings
module.exports.jj = module.exports.j;
export var j = function j() { };
module.exports.j = function j() { };


//// [index.d.ts]
export var a = function a();;
export var b = function b();;
export var c = function c();;
/**
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
export var d = function d(a, b);;
/**
 * @template T,U
 * @param {T} a
 * @param {U} b
 * @return {T & U}
 */
export var e = function e(a, b);;
/**
 * @template T
 * @param {T} a
 */
export var f = function f(a);;
export var g = g;
export var h = hh;
export var i = function i();;
export var ii = module.exports.i;
export var jj = module.exports.j;
export var j = function j();;
export {};
