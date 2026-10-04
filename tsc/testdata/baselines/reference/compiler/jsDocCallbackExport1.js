//// [tests/cases/compiler/jsDocCallbackExport1.ts] ////

//// [x.js]
/**
 * @callback Foo
 * @param {string} x
 * @returns {number}
 */
function f1() {}




//// [x.d.ts]
type Foo = (x: string) => number;
/**
 * @callback Foo
 * @param {string} x
 * @returns {number}
 */
declare function f1(): void;
