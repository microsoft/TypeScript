// @module: amd
// @Filename: foo_0.ts
module foo {
	export var answer = 42;
}

// @Filename: foo_1.ts
import foo = require("./foo_0");
// Import should fail.  foo_0 not an external module
if(foo.answer === 42){

}
