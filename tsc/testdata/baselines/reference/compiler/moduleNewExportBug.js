//// [tests/cases/compiler/moduleNewExportBug.ts] ////

//// [moduleNewExportBug.ts]
namespace mod1 {
	interface mInt {
		new (bar:any):any;
        foo (bar:any):any;
	}
 
    class C { public moo() {}}
}

var c : mod1.C; // ERROR: C should not be visible




//// [moduleNewExportBug.js]
"use strict";
var mod1;
(function (mod1) {
    class C {
        moo() { }
    }
})(mod1 || (mod1 = {}));
var c; // ERROR: C should not be visible
