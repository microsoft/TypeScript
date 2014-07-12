// @Filename: foo1.ts
export function x(){
	return true;
}

// @Filename: foo2.ts
import foo1 = require('./foo1');
var x = foo1.x;
export = x;

// @Filename: foo3.ts
import foo2 = require('./foo2');
var x = foo2(); // should be boolean