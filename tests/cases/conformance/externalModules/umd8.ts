// @module: commonjs
// @noImplicitReferences: true

// @filename: foo.d.ts
declare class Thing {
	foo(): number;
}
export = Thing;
export as namespace Foo;

// @filename: a.ts
/// <reference path="foo.d.ts" />
let y: Foo;
y.foo();

