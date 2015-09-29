// @target: es3
// @module: system
// @outFile: bundleToES3System_bundle.js
// @bundle: ./bundleToES3System_file1

// @Filename: bundleToES3System_file0.ts
export class Foo {
	static CONSTANT = "Foo";
}

export function assert(value: boolean) {
	if (!value) throw new Error("Assertion failed!");
}


// @Filename: bundleToES3System_file1.ts
import {Foo, assert} from "./bundleToES3System_file0";
assert(Foo.CONSTANT === "Foo");

export {assert} from "./bundleToES3System_file0";
