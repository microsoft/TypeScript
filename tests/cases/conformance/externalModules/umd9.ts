// @module: commonjs
// @noImplicitReferences: true
// @allowUmdGlobalAccess: true

// @filename: foo.d.ts
declare class Thing {
  foo(): number;
}
export = Thing;
export as namespace Foo;

// @filename: a.ts
/// <reference path="foo.d.ts" />
export const x = Foo; // OK in value position because allowUmdGlobalAccess: true
