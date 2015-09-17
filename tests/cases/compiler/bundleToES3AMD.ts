// @target: es3
// @module: amd
// @outFile: bundleToES3AMD_bundle.js
// @bundle: bundleToES3AMD_file1

// @Filename: bundleToES3AMD_file0.ts
export class Foo {
	static CONSTANT = "Foo";
}

export function assert(value: boolean) {
	if (!value) throw new Error("Assertion failed!");
}


// @Filename: bundleToES3AMD_file1.ts
import {Foo, assert} from "./bundleToES3AMD_file0";
assert(Foo.CONSTANT === "Foo");
