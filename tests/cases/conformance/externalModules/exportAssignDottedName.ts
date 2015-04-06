// @Filename: foo1.ts
export function x(){
	return true;
}

// @Filename: foo2.ts
import foo1 = require('./foo1');
export = foo1.x; // Ok
