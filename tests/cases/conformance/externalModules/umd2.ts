// @module: commonjs
// @noImplicitReferences: true

// @filename: foo.d.ts
export var x: number;
export function fn(): void;
export as namespace Foo;

// @filename: a.ts
Foo.fn();
let x: Foo.Thing;
let y: number = x.n;
