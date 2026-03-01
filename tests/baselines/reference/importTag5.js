//// [tests/cases/conformance/jsdoc/importTag5.ts] ////

//// [types.ts]
export interface Foo {
    a: number;
}

//// [foo.js]
/**
 * @import { Foo } from "./types"
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
 * @import { Foo } from "./types"
 */
/**
 * @param { Foo } foo
 */
declare function f(foo: Foo): void;
import type { Foo } from "./types";
