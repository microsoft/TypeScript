// @target: es6
// @module: amd
// @outFile: bundleAMD_bundle.js
// @bundle: ./bundleAMD_file1

// @Filename: bundleAMD_file0.ts
export class Foo {
	static CONSTANT = "Foo";
}

export function assert(value: boolean) {
	if (!value) throw new Error("Assertion failed!");
}


// @Filename: bundleAMD_file1.ts
import {Foo, assert} from "./bundleAMD_file0";
assert(Foo.CONSTANT === "Foo");

export {assert} from "./bundleAMD_file0";
