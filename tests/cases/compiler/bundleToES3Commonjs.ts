// @target: es3
// @module: amd
// @outFile: bundleToES3Commonjs_bundle.js
// @bundle: ./bundleToES3Commonjs_file1

// @Filename: bundleToES3Commonjs_file0.ts
export class Foo {
	static CONSTANT = "Foo";
}

export function assert(value: boolean) {
	if (!value) throw new Error("Assertion failed!");
}


// @Filename: bundleToES3Commonjs_file1.ts
import {Foo, assert} from "./bundleToES3Commonjs_file0";
assert(Foo.CONSTANT === "Foo");

export {assert} from "./bundleToES3Commonjs_file0";
