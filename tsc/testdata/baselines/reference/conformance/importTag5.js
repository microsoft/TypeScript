//// [tests/cases/conformance/jsdoc/importTag5.ts] ////

//// [types.ts]
export interface Foo {
    a: number;
}
export interface Unused {
    unused: true;
}

//// [foo.js]
/**
 * @import { Foo } from "./types"
 */

/**
 * @param { Foo } foo
 */
function f(foo) {}

//// [imports.js]
/**
 * @import { Foo, Unused } from "./types"
 */
/**
 * @param {Foo} foo
 */
export function filtered(foo) {
    return foo;
}
/**
 * @import * as types from "./types"
 */
/**
 * @param {types.Foo} foo
 */
export function namespace(foo) {
    return foo;
}




//// [types.d.ts]
export interface Foo {
    a: number;
}
export interface Unused {
    unused: true;
}
//# sourceMappingURL=types.d.ts.map//// [foo.d.ts]
/**
 * @import { Foo } from "./types"
 */
import type { Foo } from "./types";
/**
 * @param { Foo } foo
 */
declare function f(foo: Foo): void;
//# sourceMappingURL=foo.d.ts.map//// [imports.d.ts]
import type { Foo } from "./types";
/**
 * @import { Foo, Unused } from "./types"
 */
/**
 * @param {Foo} foo
 */
export declare function filtered(foo: Foo): Foo;
import type * as types from "./types";
/**
 * @import * as types from "./types"
 */
/**
 * @param {types.Foo} foo
 */
export declare function namespace(foo: types.Foo): Foo;
//# sourceMappingURL=imports.d.ts.map