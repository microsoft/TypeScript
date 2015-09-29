// @target: es3
// @module: umd
// @outFile: bundleToES3UMD_bundle.js
// @bundle: ./bundleToES3UMD_file1

// @Filename: bundleToES3UMD_file0.ts
export class Foo {
	static CONSTANT = "Foo";
}

export function assert(value: boolean) {
	if (!value) throw new Error("Assertion failed!");
}


// @Filename: bundleToES3UMD_file1.ts
import {Foo, assert} from "./bundleToES3UMD_file0";
assert(Foo.CONSTANT === "Foo");

export {assert} from "./bundleToES3UMD_file0";
