// @module: commonjs
// @Filename: foo_0.ts
class Foo<T extends {a: string; b:number;}>{
	test: T;
	constructor(x: T){}
}

export = Foo;

// @Filename: foo_1.ts
import foo = require("./foo_0");
var x = new foo(true); // Should error
var y = new foo({a: "test", b: 42}); // Should be OK
var z: number = y.test.b;