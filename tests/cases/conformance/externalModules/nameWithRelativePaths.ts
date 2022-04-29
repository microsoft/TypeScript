// @module: commonjs
// @Filename: foo_0.ts
export var foo = 42;

// @Filename: test/test/foo_1.ts
export function f(){
	return 42;
}

// @Filename: test/foo_2.ts
export module M2 {
	export var x = true;
}

// @Filename: test/foo_3.ts
import foo0 = require('../foo_0');
import foo1 = require('./test/foo_1');
import foo2 = require('./.././test/foo_2');

if(foo2.M2.x){
	var x = foo0.foo + foo1.f();
}
