// @module: commonjs
// @noImplicitReferences: true

// @filename: foo.d.ts
declare function Thing(): number;
export = Thing;
export as namespace Foo;

// @filename: a.ts
/// <reference path="foo.d.ts" />
let y: number = Foo();
