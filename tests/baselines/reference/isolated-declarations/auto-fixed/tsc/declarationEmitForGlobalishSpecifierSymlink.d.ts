//// [tests/cases/compiler/declarationEmitForGlobalishSpecifierSymlink.ts] ////

//// [/p1/node_modules/typescript-fsa/src/impl.d.ts]
export function getA(): A;
export enum A {
    Val
}
//// [/p1/node_modules/typescript-fsa/index.d.ts]
export * from "./src/impl";
//// [/p1/node_modules/typescript-fsa/package.json]
{
    "name": "typescript-fsa",
    "version": "1.0.0"
}
//// [/p2/node_modules/typescript-fsa/src/impl.d.ts]
export function getA(): A;
export enum A {
    Val
}
//// [/p2/node_modules/typescript-fsa/index.d.ts]
export * from "./src/impl";
//// [/p2/node_modules/typescript-fsa/package.json]
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
