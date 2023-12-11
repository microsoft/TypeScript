//// [tests/cases/conformance/declarationEmit/typesVersionsDeclarationEmit.multiFileBackReferenceToUnmapped.ts] ////

//// [main.ts]
import { fa } from "ext";
import { fa as fa2 } from "ext/other";

export const va = fa();
export const va2 = fa2();

//// [node_modules/ext/package.json]
{
    "name": "ext",
    "version": "1.0.0",
    "types": "index",
    "typesVersions": {
        ">=3.1.0-0": {
            "index" : ["ts3.1/index"]
        }
    }
}

//// [node_modules/ext/index.d.ts]
export interface A {}
export function fa(): A;

//// [node_modules/ext/other.d.ts]
export interface A2 {}
export function fa(): A2;

//// [node_modules/ext/ts3.1/index.d.ts]
export * from "../other";


/// [Declarations] ////



//// [/.src/main.d.ts]
export declare const va: invalid;
export declare const va2: invalid;
//# sourceMappingURL=main.d.ts.map
/// [Errors] ////

main.ts(4,19): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
main.ts(5,20): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations


==== main.ts (2 errors) ====
    import { fa } from "ext";
    import { fa as fa2 } from "ext/other";
    
    export const va = fa();
                      ~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
!!! related TS9027 main.ts:4:14: Add a type annotation to the variable va
    export const va2 = fa2();
                       ~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
!!! related TS9027 main.ts:5:14: Add a type annotation to the variable va2
    
==== node_modules/ext/package.json (0 errors) ====
    {
        "name": "ext",
        "version": "1.0.0",
        "types": "index",
        "typesVersions": {
            ">=3.1.0-0": {
                "index" : ["ts3.1/index"]
            }
        }
    }
    
==== node_modules/ext/index.d.ts (0 errors) ====
    export interface A {}
    export function fa(): A;
    
==== node_modules/ext/other.d.ts (0 errors) ====
    export interface A2 {}
    export function fa(): A2;
    
==== node_modules/ext/ts3.1/index.d.ts (0 errors) ====
    export * from "../other";
    