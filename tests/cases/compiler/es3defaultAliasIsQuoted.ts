// @module: commonjs
// @target: es3

// @Filename: es3defaultAliasQuoted_file0.ts
export class Foo {
    static CONSTANT = "Foo";
}

export default function assert(value: boolean) {
    if (!value) throw new Error("Assertion failed!");
}

// @Filename: es3defaultAliasQuoted_file1.ts
import {Foo, default as assert} from "./es3defaultAliasQuoted_file0";
assert(Foo.CONSTANT === "Foo");