// @module: commonjs
// @noImplicitReferences: true

// @filename: foo.d.ts
export var x: number;
export function fn(): void;
export interface Thing { n: typeof x }
export as namespace Foo;

// @filename: a.ts
/// <reference path="foo.d.ts" />
Foo.fn();
let x: Foo.Thing;
let y: number = x.n;
