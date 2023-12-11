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

/mod1.ts(1,24): error TS9024: Declaration emit for this file requires adding a type reference directive which are not supported with --isolatedDeclarations
/mod2.ts(2,20): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations


==== /mod2.ts (1 errors) ====
    import {foo} from "./mod1";
    export const bar = foo();
                       ~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
!!! related TS9027 /mod2.ts:2:14: Add a type annotation to the variable bar
==== /types/lib/index.d.ts (0 errors) ====
    interface Lib { x }
    
==== /mod1.ts (1 errors) ====
    export function foo(): Lib { return {x: 1} }
                           ~~~
!!! error TS9024: Declaration emit for this file requires adding a type reference directive which are not supported with --isolatedDeclarations
    