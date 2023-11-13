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



//// [main.d.ts]
export declare const va: invalid;
export declare const va2: invalid;
/// [Errors] ////

main.ts(4,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
main.ts(5,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== main.ts (2 errors) ====
    import { fa } from "ext";
    import { fa as fa2 } from "ext/other";
    
    export const va = fa();
                      ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    export const va2 = fa2();
                       ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    
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
    