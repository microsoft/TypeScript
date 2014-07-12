// @module: amd
// @Filename: foo_0.ts
export enum E1 {
	A,B,C
}

// @Filename: foo_1.ts
import foo = require("./foo_0");
if(foo.E1.A === 0){
	// Should cause runtime import - interesting optimization possibility, as gets inlined to 0.
}
