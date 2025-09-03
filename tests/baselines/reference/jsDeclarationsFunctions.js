//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsFunctions.ts] ////

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
export function a() { }
export function b() { }
b.cat = "cat";
export function c() { }
c.Cls = class {
};
/**
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
export function d(a, b) { return /** @type {*} */ (null); }
/**
 * @template T,U
 * @param {T} a
 * @param {U} b
 * @return {T & U}
 */
export function e(a, b) { return /** @type {*} */ (null); }
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
export function i() { }
export { i as ii };
export { j as jj };
export function j() { }


//// [index.d.ts]
export function a(): void;
export function b(): void;
export namespace b {
    let cat: string;
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
    y: typeof import("./index").b;
}): void;
/**
 * @param {{x: string}} a
 * @param {{y: typeof b}} b
 */
declare function hh(a: {
    x: string;
}, b: {
    y: typeof import("./index").b;
}): void;
export { hh as h, i as ii, j as jj };
