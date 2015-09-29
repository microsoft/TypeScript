// @target: es6
// @module: none
// @outFile: bundleSFX_bundle.js
// @bundle: ./bundleSFX_file1

// @Filename: bundleSFX_file0.ts
export class Foo {
	static CONSTANT = "Foo";
}

export function assert(value: boolean) {
	if (!value) throw new Error("Assertion failed!");
}


// @Filename: bundleSFX_file1.ts
import {Foo, assert} from "./bundleSFX_file0";
assert(Foo.CONSTANT === "Foo");

export {assert} from "./bundleSFX_file0";
