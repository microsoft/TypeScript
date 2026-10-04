//// [tests/cases/compiler/jsDocCallbackExport2.ts] ////

//// [x.js]
/**
 * @callback Foo
 * @param {string} x
 * @returns {number}
 */
export function f1() {}




//// [x.d.ts]
export type Foo = (x: string) => number;
/**
 * @callback Foo
 * @param {string} x
 * @returns {number}
 */
export declare function f1(): void;
