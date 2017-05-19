// @target: ES5
// @sourcemap: true
// @declaration: true
// @module: amd
// @outFile: all.js

// @Filename: ref/a.ts
/// <reference path="./b.ts" />
export class A {
	member: typeof GlobalFoo;
}

// @Filename: ref/b.ts
/// <reference path="./c.d.ts" />
class Foo {
	member: Bar;
}
declare var GlobalFoo: Foo;

// @Filename: ref/c.d.ts
/// <reference path="./d.d.ts" />
declare class Bar {
	member: Baz;
}

// @Filename: ref/d.d.ts
declare class Baz {
	member: number;
}

// @Filename: b.ts
import {A} from "./ref/a";
export class B extends A { }
