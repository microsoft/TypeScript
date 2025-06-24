//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsMissingGenerics.ts] ////

//// [file.js]
/**
 * @param {Array} x
 */
function x(x) {}
/**
 * @param {Promise} x
 */
function y(x) {}

//// [file.js]
/**
 * @param {Array} x
 */
function x(x) { }
/**
 * @param {Promise} x
 */
function y(x) { }


//// [file.d.ts]
/**
 * @param {Array} x
 */
declare function x(x: Array): void;
/**
 * @param {Promise} x
 */
declare function y(x: Promise): void;


//// [DtsFileErrors]


out/file.d.ts(4,23): error TS2314: Generic type 'Array<T>' requires 1 type argument(s).
out/file.d.ts(8,23): error TS2314: Generic type 'Promise<T>' requires 1 type argument(s).


==== out/file.d.ts (2 errors) ====
    /**
     * @param {Array} x
     */
    declare function x(x: Array): void;
                          ~~~~~
!!! error TS2314: Generic type 'Array<T>' requires 1 type argument(s).
    /**
     * @param {Promise} x
     */
    declare function y(x: Promise): void;
                          ~~~~~~~
!!! error TS2314: Generic type 'Promise<T>' requires 1 type argument(s).
    