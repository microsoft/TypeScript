// @module: commonjs
// @noImplicitReferences: true

// @filename: foo.d.ts
export var x: number;
export function fn(): void;
export interface Thing { n: typeof x }
export as namespace Foo;

// @filename: a.ts
import * as Bar from './foo';
Bar.fn();
let x: Bar.Thing;
let y: number = x.n;
