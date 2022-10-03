// @module: amd
// @Filename: foo_0.ts
interface Foo {
	(a: string): void;
	b: string;
}
interface Foo {
	(a: number): number;
	c: boolean;
	d: {x: number; y: number};
}
export = Foo;

// @Filename: foo_1.ts
import foo = require("./foo_0");
var x: foo;
x("test");
x(42);
var y: string = x.b;
if(!!x.c){ }
var z = {x: 1, y: 2};
z = x.d;