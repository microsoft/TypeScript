//// [tests/cases/compiler/moduleResolutionWithExtensions_withPaths.ts] ////

//// [test.js]
export function test() {
	console.log("test");
}

//// [test.d.ts]
export declare function test(): void;

//// [relative.js]
export function relative() {
	console.log("test");
}

//// [relative.d.ts]
export declare function relative(): void;


//// [test.ts]
import { test } from "foo/test.js";
import { test as test2 } from "foo/test";
import { relative } from "./relative.js";
import { relative as relative2 } from "./relative";




//// [test.js]
export {};
