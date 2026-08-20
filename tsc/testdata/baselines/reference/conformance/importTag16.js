//// [tests/cases/conformance/jsdoc/importTag16.ts] ////

//// [a.ts]
export default interface Foo {}
export interface I {}

//// [b.js]
/** @import Foo, { I } from "./a" */

/**
 * @param {Foo} a
 * @param {I} b
 */
export function foo(a, b) {}




//// [a.d.ts]
export default interface Foo {
}
export interface I {
}
//// [b.d.ts]
/** @import Foo, { I } from "./a" */
import type Foo, { I } from "./a";
/**
 * @param {Foo} a
 * @param {I} b
 */
export declare function foo(a: Foo, b: I): void;


//// [DtsFileErrors]


b.d.ts(2,8): error TS1363: A type-only import can specify a default import or named bindings, but not both.


==== a.d.ts (0 errors) ====
    export default interface Foo {
    }
    export interface I {
    }
    
==== b.d.ts (1 errors) ====
    /** @import Foo, { I } from "./a" */
    import type Foo, { I } from "./a";
           ~~~~~~~~~~~~~~~
!!! error TS1363: A type-only import can specify a default import or named bindings, but not both.
    /**
     * @param {Foo} a
     * @param {I} b
     */
    export declare function foo(a: Foo, b: I): void;
    