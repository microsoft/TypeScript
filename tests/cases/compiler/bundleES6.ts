// @target: es6
// @module: es6
// @outFile: bundleES6_bundle.js
// @bundle: bundleES6_file1

// @Filename: bundleES6_file0.ts
export class Foo {
	static CONSTANT = "Foo";
}

export function assert(value: boolean) {
	if (!value) throw new Error("Assertion failed!");
}


// @Filename: bundleES6_file1.ts
import {Foo, assert} from "./bundleES6_file0";
assert(Foo.CONSTANT === "Foo");
