//// [tests/cases/compiler/moduleResolutionWithSuffixes_one_dirModuleWithIndex.ts] ////

//// [index.ts]
import { ios } from "./foo";
//// [index.ios.ts]
export function ios() {}
//// [index.ts]
export function base() {}

//// [index.ios.js]
export function ios() { }
//// [index.js]
export {};
//// [index.js]
export function base() { }
