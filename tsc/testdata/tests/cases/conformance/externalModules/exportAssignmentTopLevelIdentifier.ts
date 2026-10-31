// @target: es2015
// @module: commonjs
// @Filename: foo_0.ts
namespace Foo {
	export var answer = 42;
}
export = Foo;

// @Filename: foo_1.ts
import foo = require("./foo_0");
if(foo.answer === 42){

}
