//// [tests/cases/compiler/jsDocCallbackExport1.ts] ////

//// [x.js]
/**
 * @callback Foo
 * @param {string} x
 * @returns {number}
 */
function f1() {}




//// [x.d.ts]
/**
 * @callback Foo
 * @param {string} x
 * @returns {number}
 */
type Foo = (x: string) => number;
declare function f1(): void;
