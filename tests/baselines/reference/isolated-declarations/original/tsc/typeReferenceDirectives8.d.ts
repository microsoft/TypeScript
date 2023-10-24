//// [tests/cases/compiler/typeReferenceDirectives8.ts] ////

//// [/mod2.ts]
import {foo} from "./mod1";
export const bar = foo();
//// [/types/lib/index.d.ts]
interface Lib { x }

//// [/mod1.ts]
export function foo(): Lib { return {x: 1} }


/// [Declarations] ////



//// [/mod1.d.ts]
export declare function foo(): Lib;

//// [/mod2.d.ts]
export declare const bar: invalid;
/// [Errors] ////

/mod1.ts(1,24): error TS9008: Declaration emit for this file requires adding a type reference directive. Add a type reference directive to lib to unblock declaration emit.
/mod2.ts(2,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== /mod2.ts (1 errors) ====
    import {foo} from "./mod1";
    export const bar = foo();
                       ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
==== /types/lib/index.d.ts (0 errors) ====
    interface Lib { x }
    
==== /mod1.ts (1 errors) ====
    export function foo(): Lib { return {x: 1} }
                           ~~~
!!! error TS9008: Declaration emit for this file requires adding a type reference directive. Add a type reference directive to lib to unblock declaration emit.
    