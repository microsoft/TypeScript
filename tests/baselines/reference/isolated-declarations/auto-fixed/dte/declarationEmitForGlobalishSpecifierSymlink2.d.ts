//// [tests/cases/compiler/declarationEmitForGlobalishSpecifierSymlink2.ts] ////

//// [impl.d.ts]
export function getA(): A;
export enum A {
    Val
}
//// [index.d.ts]
export * from "./src/impl";
//// [package.json]
{
    "name": "typescript-fsa",
    "version": "1.0.0"
}
//// [index.ts]
import * as _whatever from "p2";
import { getA } from "typescript-fsa";

export const a = getA();
//// [index.d.ts]
export const a: import("typescript-fsa").A;



/// [Declarations] ////



//// [/p1/index.d.ts]
export declare const a: invalid;
//# sourceMappingURL=index.d.ts.map
/// [Errors] ////

/p1/index.ts(4,18): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.


==== /cache/typescript-fsa/src/impl.d.ts (0 errors) ====
    export function getA(): A;
    export enum A {
        Val
    }
==== /cache/typescript-fsa/index.d.ts (0 errors) ====
    export * from "./src/impl";
==== /cache/typescript-fsa/package.json (0 errors) ====
    {
        "name": "typescript-fsa",
        "version": "1.0.0"
    }
==== /p1/index.ts (1 errors) ====
    import * as _whatever from "p2";
    import { getA } from "typescript-fsa";
    
    export const a = getA();
                     ~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 /p1/index.ts:4:14: Add a type annotation to the variable a.
==== /p2/index.d.ts (0 errors) ====
    export const a: import("typescript-fsa").A;
    
    