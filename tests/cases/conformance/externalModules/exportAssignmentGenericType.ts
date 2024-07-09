// @module: commonjs
// @Filename: foo_0.ts
class Foo<T>{
	test: T;
}
export = Foo;

// @Filename: foo_1.ts
import foo = require("./foo_0");
var x = new foo<number>();
var y:number = x.test;
