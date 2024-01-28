//// [tests/cases/conformance/jsdoc/importTypeTag5.ts] ////

//// [types.ts]
export interface Foo {
    a: number;
}

//// [foo.js]
/**
 * @importType { Foo } from "./types"
 */

/**
 * @param { Foo } foo
 */
function f(foo) {}




//// [types.d.ts]
export interface Foo {
    a: number;
}
//// [foo.d.ts]
/**
 * @importType { Foo } from "./types"
 */
/**
 * @param { Foo } foo
 */
declare function f(foo: import("./types").Foo): void;
