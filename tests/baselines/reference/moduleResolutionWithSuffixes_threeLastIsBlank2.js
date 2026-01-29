//// [tests/cases/compiler/moduleResolutionWithSuffixes_threeLastIsBlank2.ts] ////

//// [index.ts]
import { native } from "./foo";
//// [foo__native.ts]
export function native() {}
//// [foo.ts]
export function base() {}


//// [foo__native.js]
export function native() { }
//// [index.js]
export {};
//// [foo.js]
export function base() { }
