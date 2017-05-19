// @module: commonjs
// @noImplicitReferences: true

// @filename: foo.d.ts
declare class Thing {
	foo(): number;
}
declare namespace Thing {
	interface SubThing { }
}
export = Thing;
export as namespace Foo;

// @filename: a.ts
/// <reference path="foo.d.ts" />
import * as ff from './foo';

let y: Foo; // OK in type position
y.foo();
let z: Foo.SubThing; // OK in ns position
let x: any = Foo; // Not OK in value position
