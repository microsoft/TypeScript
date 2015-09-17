// @target: es3
// @module: none
// @outFile: bundleToES3SFX_bundle.js
// @bundle: bundleToES3SFX_file1

// @Filename: bundleToES3SFX_file0.ts
export class Foo {
	static CONSTANT = "Foo";
}

export function assert(value: boolean) {
	if (!value) throw new Error("Assertion failed!");
}


// @Filename: bundleToES3SFX_file1.ts
import {Foo, assert} from "./bundleToES3SFX_file0";
assert(Foo.CONSTANT === "Foo");
