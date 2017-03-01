// Test that extending an untyped module is an error, unlike extending unknownSymbol.
// @noImplicitReferences: true

// @Filename: /node_modules/foo/index.js
This file is not read.

// @Filename: /a.ts
import Foo from "foo";
class A extends Foo { }
