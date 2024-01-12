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
export declare const a: import("typescript-fsa").A;
//# sourceMappingURL=index.d.ts.map