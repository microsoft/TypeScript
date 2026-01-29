//// [tests/cases/compiler/importShouldNotBeElidedInDeclarationEmit.ts] ////

//// [umd.d.ts]
export as namespace UMD;

export type Thing = {
    a: number;
}

export declare function makeThing(): Thing;
//// [index.ts]
import { makeThing } from "umd";
export const thing = makeThing();


//// [index.js]
import { makeThing } from "umd";
export const thing = makeThing();


//// [index.d.ts]
export declare const thing: import("umd").Thing;
