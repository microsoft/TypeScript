//// [tests/cases/compiler/moduleResolutionWithSuffixes_oneNotFound.ts] ////

//// [index.ts]
import { ios } from "./foo";
//// [foo.ts]
export function base() {}


//// [index.js]
export {};
//// [foo.js]
export function base() { }
