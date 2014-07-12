//@module: amd
// @Filename: exportEqualsModule_A.ts
module M {
	export var x;
}

import M2 = M;

export = M2; // should not error
