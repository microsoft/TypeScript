// @module: amd
// @Filename: foo_0.ts
enum foo {
	red, green, blue
}
module foo {
	export var answer = 42;
}
export = foo;

// @Filename: foo_1.ts
import foo = require("./foo_0");
var color: foo;
if(color === foo.green){
	color = foo.answer;
}
