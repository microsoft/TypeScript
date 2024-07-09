// @module: commonjs
// @Filename: foo_0.ts
module Foo {
	export function a(){
		return 5;
	}
	export var b = true;
}
module Foo {
	export function c(a: number){
		return a;
	}
	export module Test {
		export var answer = 42;
	}
}
export = Foo;

// @Filename: foo_1.ts
import foo = require("./foo_0");
var a: number = foo.a();
if(!!foo.b){
	foo.Test.answer = foo.c(42);
}