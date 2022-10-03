//// [moduleNewExportBug.ts]
module mod1 {
	interface mInt {
		new (bar:any):any;
        foo (bar:any):any;
	}
 
    class C { public moo() {}}
}

var c : mod1.C; // ERROR: C should not be visible




//// [moduleNewExportBug.js]
var mod1;
(function (mod1) {
    var C = /** @class */ (function () {
        function C() {
        }
        C.prototype.moo = function () { };
        return C;
    }());
})(mod1 || (mod1 = {}));
var c; // ERROR: C should not be visible
