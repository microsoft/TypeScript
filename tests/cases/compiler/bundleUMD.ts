// @target: es6
// @module: umd
// @outFile: bundleUMD_bundle.js
// @bundle: ./bundleUMD_file1

// @Filename: bundleUMD_file0.ts
export class Foo {
	static CONSTANT = "Foo";
}

export function assert(value: boolean) {
	if (!value) throw new Error("Assertion failed!");
}


// @Filename: bundleUMD_file1.ts
import {Foo, assert} from "./bundleUMD_file0";
assert(Foo.CONSTANT === "Foo");

export {assert} from "./bundleUMD_file0";
