// @module: amd
// @Filename: foo_0.ts
module Foo {
	export var answer = 42;
}
export = Foo;

// @Filename: foo_1.ts
import foo = require("./foo_0");
if(foo.answer === 42){

}
