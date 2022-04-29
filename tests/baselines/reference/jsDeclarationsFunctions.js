//// [index.js]
export function a() {}

export function b() {}
b.cat = "cat";

export function c() {}
c.Cls = class {}

/**
 * @param {number} a
 * @param {number} b
 * @return {string} 
 */
export function d(a, b) { return /** @type {*} */(null); }

/**
 * @template T,U
 * @param {T} a
 * @param {U} b
 * @return {T & U} 
 */
export function e(a, b) { return /** @type {*} */(null); }

/**
 * @template T
 * @param {T} a
 */
export function f(a) {
    return a;
}
f.self = f;

/**
 * @param {{x: string}} a
 * @param {{y: typeof b}} b
 */
function g(a, b) {
    return a.x && b.y();
}

export { g };

/**
 * @param {{x: string}} a
 * @param {{y: typeof b}} b
 */
function hh(a, b) {
    return a.x && b.y();
}

export { hh as h };

export function i() {}
export { i as ii };

export { j as jj };
export function j() {}


//// [index.js]
"use strict";
exports.__esModule = true;
exports.j = exports.jj = exports.ii = exports.i = exports.h = exports.g = exports.f = exports.e = exports.d = exports.c = exports.b = exports.a = void 0;
function a() { }
exports.a = a;
function b() { }
exports.b = b;
b.cat = "cat";
function c() { }
exports.c = c;
c.Cls = /** @class */ (function () {
    function Cls() {
    }
    return Cls;
}());
/**
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
function d(a, b) { return /** @type {*} */ (null); }
exports.d = d;
/**
 * @template T,U
 * @param {T} a
 * @param {U} b
 * @return {T & U}
 */
function e(a, b) { return /** @type {*} */ (null); }
exports.e = e;
/**
 * @template T
 * @param {T} a
 */
function f(a) {
    return a;
}
exports.f = f;
f.self = f;
/**
 * @param {{x: string}} a
 * @param {{y: typeof b}} b
 */
function g(a, b) {
    return a.x && b.y();
}
exports.g = g;
/**
 * @param {{x: string}} a
 * @param {{y: typeof b}} b
 */
function hh(a, b) {
    return a.x && b.y();
}
exports.h = hh;
function i() { }
exports.i = i;
exports.ii = i;
function j() { }
exports.j = j;
exports.jj = j;


//// [index.d.ts]
export function a(): void;
export function b(): void;
export namespace b {
    const cat: string;
}
export function c(): void;
export namespace c {
    export { Cls };
}
/**
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
export function d(a: number, b: number): string;
/**
 * @template T,U
 * @param {T} a
 * @param {U} b
 * @return {T & U}
 */
export function e<T, U>(a: T, b: U): T & U;
/**
 * @template T
 * @param {T} a
 */
export function f<T>(a: T): T;
export namespace f {
    export { f as self };
}
export function i(): void;
export function j(): void;
declare class Cls {
}
/**
 * @param {{x: string}} a
 * @param {{y: typeof b}} b
 */
export function g(a: {
    x: string;
}, b: {
    y: typeof b;
}): void;
/**
 * @param {{x: string}} a
 * @param {{y: typeof b}} b
 */
declare function hh(a: {
    x: string;
}, b: {
    y: typeof b;
}): void;
export { hh as h, i as ii, j as jj };
