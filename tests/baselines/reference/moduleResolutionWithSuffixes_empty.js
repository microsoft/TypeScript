//// [tests/cases/compiler/moduleResolutionWithSuffixes_empty.ts] ////

//// [index.ts]
import { base } from "./foo";
//// [foo.ts]
export function base() {}


//// [foo.js]
export function base() { }
//// [index.js]
export {};
