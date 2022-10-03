// @module: amd
// @Filename: foo_0.ts
export class C1 {
	m1 = 42;
	static s1 = true;
}

// @Filename: foo_1.ts
import c1 = require('./foo_0'); // Makes this an external module
var answer = 42; // No exports

// @Filename: foo_2.ts
import foo = require("./foo_1");
var x = foo; // Cause a runtime dependency
