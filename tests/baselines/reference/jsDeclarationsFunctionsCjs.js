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
module.exports.a = function a() { };
module.exports.b = function b() { };
module.exports.b.cat = "cat";
module.exports.c = function c() { };
module.exports.c.Cls = /** @class */ (function () {
    function Cls() {
    }
    return Cls;
}());
/**
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
module.exports.d = function d(a, b) { return /** @type {*} */ (null); };
/**
 * @template T,U
 * @param {T} a
 * @param {U} b
 * @return {T & U}
 */
module.exports.e = function e(a, b) { return /** @type {*} */ (null); };
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
module.exports.g = g;
/**
 * @param {{x: string}} a
 * @param {{y: typeof module.exports.b}} b
 */
function hh(a, b) {
    return a.x && b.y();
}
module.exports.h = hh;
module.exports.i = function i() { };
module.exports.ii = module.exports.i;
// note that this last one doesn't make much sense in cjs, since exports aren't hoisted bindings
module.exports.jj = module.exports.j;
module.exports.j = function j() { };


//// [index.d.ts]
declare var a_1: () => void;
declare var b_1: {
    (): void;
    cat: string;
};
declare var c_1: {
    (): void;
    Cls: {
        new (): {};
    };
};
declare var d_1: (a: number, b: number) => string;
declare var e_1: <T, U>(a: T, b: U) => T & U;
declare var f_1: {
    <T>(a: T): T;
    self: any;
};
declare function g(a: {
    x: string;
}, b: {
    y: {
        (): void;
        cat: string;
    };
}): void;
declare var g_1: typeof g;
declare function hh(a: {
    x: string;
}, b: {
    y: {
        (): void;
        cat: string;
    };
}): void;
declare var h_1: typeof hh;
declare var i_1: () => void;
declare var ii_1: () => void;
declare var jj_1: () => void;
declare var j_1: () => void;
export { a_1 as a, b_1 as b, c_1 as c, d_1 as d, e_1 as e, f_1 as f, g_1 as g, h_1 as h, i_1 as i, ii_1 as ii, jj_1 as jj, j_1 as j };
