//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportDefinePropertyEmit.ts] ////

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
"use strict";
Object.defineProperty(module.exports, "a", { value: function a() { } });
Object.defineProperty(module.exports, "b", { value: function b() { } });
Object.defineProperty(module.exports.b, "cat", { value: "cat" });
/**
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
function d(a, b) { return /** @type {*} */ null; }
Object.defineProperty(module.exports, "d", { value: d });
/**
 * @template T,U
 * @param {T} a
 * @param {U} b
 * @return {T & U}
 */
function e(a, b) { return /** @type {*} */ null; }
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
declare const _exported: () => void;
export { _exported as "a" };
declare const _exported_1: () => void;
export { _exported_1 as "b" };
/**
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
declare function d(a: number, b: number): string;
declare const _exported_2: typeof d;
export { _exported_2 as "d" };
/**
 * @template T,U
 * @param {T} a
 * @param {U} b
 * @return {T & U}
 */
declare function e<T, U>(a: T, b: U): T & U;
declare const _exported_3: typeof e;
export { _exported_3 as "e" };
/**
 * @template T
 * @param {T} a
 */
declare function f<T>(a: T): T;
declare const _exported_4: typeof f;
export { _exported_4 as "f" };
/**
 * @param {{x: string}} a
 * @param {{y: typeof module.exports.b}} b
 */
declare function g(a: {
    x: string;
}, b: {
    y: typeof module.exports.b;
}): void | "";
declare const _exported_5: typeof g;
export { _exported_5 as "g" };
/**
 * @param {{x: string}} a
 * @param {{y: typeof module.exports.b}} b
 */
declare function hh(a: {
    x: string;
}, b: {
    y: typeof module.exports.b;
}): void | "";
declare const _exported_6: typeof hh;
export { _exported_6 as "h" };
declare const _exported_7: () => void;
export { _exported_7 as "i" };
declare const _exported_8: () => void;
export { _exported_8 as "ii" };
declare const _exported_9: () => void;
export { _exported_9 as "jj" };
declare const _exported_10: () => void;
export { _exported_10 as "j" };


//// [DtsFileErrors]


out/index.d.ts(2,23): error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
out/index.d.ts(4,25): error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
out/index.d.ts(12,25): error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
out/index.d.ts(21,25): error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
out/index.d.ts(28,25): error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
out/index.d.ts(36,15): error TS2580: Cannot find name 'module'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
out/index.d.ts(39,25): error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
out/index.d.ts(47,15): error TS2580: Cannot find name 'module'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
out/index.d.ts(50,25): error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
out/index.d.ts(52,25): error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
out/index.d.ts(54,25): error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
out/index.d.ts(56,25): error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
out/index.d.ts(58,26): error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.


==== out/index.d.ts (13 errors) ====
    declare const _exported: () => void;
    export { _exported as "a" };
                          ~~~
!!! error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
    declare const _exported_1: () => void;
    export { _exported_1 as "b" };
                            ~~~
!!! error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
    /**
     * @param {number} a
     * @param {number} b
     * @return {string}
     */
    declare function d(a: number, b: number): string;
    declare const _exported_2: typeof d;
    export { _exported_2 as "d" };
                            ~~~
!!! error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
    /**
     * @template T,U
     * @param {T} a
     * @param {U} b
     * @return {T & U}
     */
    declare function e<T, U>(a: T, b: U): T & U;
    declare const _exported_3: typeof e;
    export { _exported_3 as "e" };
                            ~~~
!!! error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
    /**
     * @template T
     * @param {T} a
     */
    declare function f<T>(a: T): T;
    declare const _exported_4: typeof f;
    export { _exported_4 as "f" };
                            ~~~
!!! error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
    /**
     * @param {{x: string}} a
     * @param {{y: typeof module.exports.b}} b
     */
    declare function g(a: {
        x: string;
    }, b: {
        y: typeof module.exports.b;
                  ~~~~~~
!!! error TS2580: Cannot find name 'module'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
    }): void | "";
    declare const _exported_5: typeof g;
    export { _exported_5 as "g" };
                            ~~~
!!! error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
    /**
     * @param {{x: string}} a
     * @param {{y: typeof module.exports.b}} b
     */
    declare function hh(a: {
        x: string;
    }, b: {
        y: typeof module.exports.b;
                  ~~~~~~
!!! error TS2580: Cannot find name 'module'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
    }): void | "";
    declare const _exported_6: typeof hh;
    export { _exported_6 as "h" };
                            ~~~
!!! error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
    declare const _exported_7: () => void;
    export { _exported_7 as "i" };
                            ~~~
!!! error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
    declare const _exported_8: () => void;
    export { _exported_8 as "ii" };
                            ~~~~
!!! error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
    declare const _exported_9: () => void;
    export { _exported_9 as "jj" };
                            ~~~~
!!! error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
    declare const _exported_10: () => void;
    export { _exported_10 as "j" };
                             ~~~
!!! error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
    