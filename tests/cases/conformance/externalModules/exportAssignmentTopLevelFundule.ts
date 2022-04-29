// @module: amd
// @Filename: foo_0.ts
function foo() {
	return "test";
}
module foo {
	export var answer = 42;
}
export = foo;

// @Filename: foo_1.ts
import foo = require("./foo_0");
if(foo.answer === 42){
	var x = foo();
}
