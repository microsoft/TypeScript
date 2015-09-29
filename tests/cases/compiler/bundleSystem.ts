// @target: es6
// @module: system
// @outFile: bundleSystem_bundle.js
// @bundle: ./bundleSystem_file1

// @Filename: bundleSystem_file0.ts
export class Foo {
	static CONSTANT = "Foo";
}

export function assert(value: boolean) {
	if (!value) throw new Error("Assertion failed!");
}


// @Filename: bundleSystem_file1.ts
import {Foo, assert} from "./bundleSystem_file0";
assert(Foo.CONSTANT === "Foo");

export {assert} from "./bundleSystem_file0";
