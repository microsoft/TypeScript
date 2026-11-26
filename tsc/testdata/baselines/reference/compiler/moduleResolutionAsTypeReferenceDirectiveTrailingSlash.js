//// [tests/cases/compiler/moduleResolutionAsTypeReferenceDirectiveTrailingSlash.ts] ////

//// [lib.d.ts]
export declare const fromFile: number;

//// [.d.ts]
export declare const fromFile: number;

//// [index.d.ts]
export declare const fromDirectory: number;

//// [a.ts]
import { fromDirectory, fromFile } from "lib/";
export const values = [fromDirectory, fromFile];


//// [a.js]
import { fromDirectory, fromFile } from "lib/";
export const values = [fromDirectory, fromFile];
