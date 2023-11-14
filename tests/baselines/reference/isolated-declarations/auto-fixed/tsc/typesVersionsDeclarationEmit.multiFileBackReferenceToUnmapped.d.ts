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
export declare const va: import("ext").A2;
export declare const va2: import("ext").A2;
//# sourceMappingURL=main.d.ts.map