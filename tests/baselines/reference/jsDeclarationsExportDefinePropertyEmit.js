//// [index.js]
Object.defineProperty(module.exports, "a", { value: function a() {} });

Object.defineProperty(module.exports, "b", { value: function b() {} });
Object.defineProperty(module.exports.b, "cat", { value: "cat" });

/**
 * @param {number} a
 * @param {number} b
 * @return {string} 
 */
function d(a, b) { return /** @type {*} */(null); }
Object.defineProperty(module.exports, "d", { value: d });


/**
 * @template T,U
 * @param {T} a
 * @param {U} b
 * @return {T & U} 
 */
function e(a, b) { return /** @type {*} */(null); }
Object.defineProperty(module.exports, "e", { value: e });

/**
 * @template T
 * @param {T} a
 */
function f(a) {
    return a;
}
Object.defineProperty(module.exports, "f", { value: f });
Object.defineProperty(module.exports.f, "self", { value: module.exports.f });

/**
 * @param {{x: string}} a
 * @param {{y: typeof module.exports.b}} b
 */
function g(a, b) {
    return a.x && b.y();
}
Object.defineProperty(module.exports, "g", { value: g });


/**
 * @param {{x: string}} a
 * @param {{y: typeof module.exports.b}} b
 */
function hh(a, b) {
    return a.x && b.y();
}
Object.defineProperty(module.exports, "h", { value: hh });

Object.defineProperty(module.exports, "i", { value: function i(){} });
Object.defineProperty(module.exports, "ii", { value: module.exports.i });

// note that this last one doesn't make much sense in cjs, since exports aren't hoisted bindings
Object.defineProperty(module.exports, "jj", { value: module.exports.j });
Object.defineProperty(module.exports, "j", { value: function j() {} });


//// [index.js]
Object.defineProperty(module.exports, "a", { value: function a() { } });
Object.defineProperty(module.exports, "b", { value: function b() { } });
Object.defineProperty(module.exports.b, "cat", { value: "cat" });
/**
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
function d(a, b) { return /** @type {*} */ (null); }
Object.defineProperty(module.exports, "d", { value: d });
/**
 * @template T,U
 * @param {T} a
 * @param {U} b
 * @return {T & U}
 */
function e(a, b) { return /** @type {*} */ (null); }
Object.defineProperty(module.exports, "e", { value: e });
/**
 * @template T
 * @param {T} a
 */
function f(a) {
    return a;
}
Object.defineProperty(module.exports, "f", { value: f });
Object.defineProperty(module.exports.f, "self", { value: module.exports.f });
/**
 * @param {{x: string}} a
 * @param {{y: typeof module.exports.b}} b
 */
function g(a, b) {
    return a.x && b.y();
}
Object.defineProperty(module.exports, "g", { value: g });
/**
 * @param {{x: string}} a
 * @param {{y: typeof module.exports.b}} b
 */
function hh(a, b) {
    return a.x && b.y();
}
Object.defineProperty(module.exports, "h", { value: hh });
Object.defineProperty(module.exports, "i", { value: function i() { } });
Object.defineProperty(module.exports, "ii", { value: module.exports.i });
// note that this last one doesn't make much sense in cjs, since exports aren't hoisted bindings
Object.defineProperty(module.exports, "jj", { value: module.exports.j });
Object.defineProperty(module.exports, "j", { value: function j() { } });


//// [index.d.ts]
export function a(): void;
export function b(): void;
export namespace b {
    const cat: string;
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
    /**
     * @template T
     * @param {T} a
     */
    function self<T>(a: T): T;
}
/**
 * @param {{x: string}} a
 * @param {{y: typeof module.exports.b}} b
 */
export function g(a: {
    x: string;
}, b: {
    y: () => void;
}): void;
/**
 * @param {{x: string}} a
 * @param {{y: typeof module.exports.b}} b
 */
export function h(a: {
    x: string;
}, b: {
    y: () => void;
}): void;
export function i(): void;
export function ii(): void;
export function jj(): void;
export function j(): void;
