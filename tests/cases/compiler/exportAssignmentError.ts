//@module: amd
// @Filename: exportEqualsModule_A.ts
namespace M {
	export var x;
}

import M2 = M;

export = M2; // should not error
