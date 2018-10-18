// Test that extending an untyped module is an error, unlike extending unknownSymbol.
// @noImplicitReferences: true
// @noUnusedLocals: true

// @Filename: /node_modules/foo/index.js
This file is not read.

// @Filename: /node_modules/bar/index.js
Nor is this one.

// @Filename: /a.ts
import Foo from "foo";
import Bar from "bar"; // error: unused
export class A extends Foo { }
