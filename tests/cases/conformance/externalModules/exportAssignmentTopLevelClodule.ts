// @module: amd
// @Filename: foo_0.ts
class Foo {
	test = "test";
}
module Foo {
	export var answer = 42;
}
export = Foo;

// @Filename: foo_1.ts
import foo = require("./foo_0");
if(foo.answer === 42){
	var x = new foo();
}
