//// [tests/cases/compiler/moduleResolutionWithSuffixes_threeLastIsBlank1.ts] ////

//// [index.ts]
import { ios } from "./foo";
//// [foo-ios.ts]
export function ios() {}
//// [foo__native.ts]
export function native() {}
//// [foo.ts]
export function base() {}


//// [foo-ios.js]
export function ios() { }
//// [index.js]
export {};
//// [foo__native.js]
export function native() { }
//// [foo.js]
export function base() { }
