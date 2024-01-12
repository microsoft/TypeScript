//// [tests/cases/conformance/declarationEmit/typesVersionsDeclarationEmit.multiFile.ts] ////

//// [main.ts]
import { fa } from "ext";
import { fb } from "ext/other";

export const va = fa();
export const vb = fb();

//// [package.json]
{
    "name": "ext",
    "version": "1.0.0",
    "types": "index",
    "typesVersions": {
        ">=3.1.0-0": { "*" : ["ts3.1/*"] }
    }
}

//// [index.d.ts]
export interface A {}
export function fa(): A;

//// [other.d.ts]
export interface B {}
export function fb(): B;

//// [index.d.ts]
export interface A {}
export function fa(): A;

//// [other.d.ts]
export interface B {}
export function fb(): B;


/// [Declarations] ////



//// [/.src/main.d.ts]
export declare const va: import("ext").A;
export declare const vb: import("ext/other").B;
//# sourceMappingURL=main.d.ts.map