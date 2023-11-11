//// [tests/cases/compiler/declarationEmitForGlobalishSpecifierSymlink2.ts] ////

//// [/cache/typescript-fsa/src/impl.d.ts]
export function getA(): A;
export enum A {
    Val
}
//// [/cache/typescript-fsa/index.d.ts]
export * from "./src/impl";
//// [/cache/typescript-fsa/package.json]
{
    "name": "typescript-fsa",
    "version": "1.0.0"
}
//// [/p1/index.ts]
import * as _whatever from "p2";
import { getA } from "typescript-fsa";

export const a = getA();
//// [/p2/index.d.ts]
export const a: import("typescript-fsa").A;



/// [Declarations] ////



//// [/p1/index.d.ts]
export declare const a: import("typescript-fsa").A;
