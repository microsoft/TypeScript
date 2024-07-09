// @module: commonjs
// @Filename: foo_0.ts
export class C1 {
	m1 = 42;
	static s1 = true;
}

// @Filename: foo_1.ts
import foo = require("./foo_0");
if(foo.C1.s1){
	// Should cause runtime import
}
