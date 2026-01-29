//// [tests/cases/compiler/moduleResolutionWithSuffixes_one.ts] ////

//// [index.ts]
import { ios } from "./foo";
//// [foo.ios.ts]
export function ios() {}
//// [foo.ts]
export function base() {}


//// [foo.ios.js]
export function ios() { }
//// [index.js]
export {};
//// [foo.js]
export function base() { }
