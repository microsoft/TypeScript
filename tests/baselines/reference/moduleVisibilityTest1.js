//// [tests/cases/compiler/moduleVisibilityTest1.ts] ////

//// [moduleVisibilityTest1.ts]
namespace OuterMod {
	export function someExportedOuterFunc() { return -1; }

	export namespace OuterInnerMod {
		export function someExportedOuterInnerFunc() { return "foo"; }
	}
}

import OuterInnerAlias = OuterMod.OuterInnerMod;

namespace M {

	export namespace InnerMod {
		export function someExportedInnerFunc() { return -2; }
	}

	export enum E {
		A,
		B,
		C,
	}

	export var x = 5;
	export declare var exported_var;

	var y = x + x;


	export interface I {
		someMethod():number;
	}

	 class B {public b = 0;}

	 export class C implements I {
		public someMethodThatCallsAnOuterMethod() {return OuterInnerAlias.someExportedOuterInnerFunc();}
		public someMethodThatCallsAnInnerMethod() {return InnerMod.someExportedInnerFunc();}
		public someMethodThatCallsAnOuterInnerMethod() {return OuterMod.someExportedOuterFunc();}
		public someMethod() { return 0; }
		public someProp = 1;

		constructor() {
		    function someInnerFunc() { return 2; }
            var someInnerVar = 3;
		}
	}

	var someModuleVar = 4;

	function someModuleFunction() { return 5;}
}

namespace M {
	export var c = x;
	export var meb = M.E.B;
}

var cprime : M.I = <M.I>null;

var c = new M.C();
var z = M.x;
var alpha = M.E.A;
var omega = M.exported_var;
c.someMethodThatCallsAnOuterMethod();


//// [moduleVisibilityTest1.js]
var OuterMod;
(function (OuterMod) {
    function someExportedOuterFunc() { return -1; }
    OuterMod.someExportedOuterFunc = someExportedOuterFunc;
    var OuterInnerMod;
    (function (OuterInnerMod) {
        function someExportedOuterInnerFunc() { return "foo"; }
        OuterInnerMod.someExportedOuterInnerFunc = someExportedOuterInnerFunc;
    })(OuterInnerMod = OuterMod.OuterInnerMod || (OuterMod.OuterInnerMod = {}));
})(OuterMod || (OuterMod = {}));
var OuterInnerAlias = OuterMod.OuterInnerMod;
var M;
(function (M) {
    var InnerMod;
    (function (InnerMod) {
        function someExportedInnerFunc() { return -2; }
        InnerMod.someExportedInnerFunc = someExportedInnerFunc;
    })(InnerMod = M.InnerMod || (M.InnerMod = {}));
    var E;
    (function (E) {
        E[E["A"] = 0] = "A";
        E[E["B"] = 1] = "B";
        E[E["C"] = 2] = "C";
    })(E = M.E || (M.E = {}));
    M.x = 5;
    var y = M.x + M.x;
    var B = /** @class */ (function () {
        function B() {
            this.b = 0;
        }
        return B;
    }());
    var C = /** @class */ (function () {
        function C() {
            this.someProp = 1;
            function someInnerFunc() { return 2; }
            var someInnerVar = 3;
        }
        C.prototype.someMethodThatCallsAnOuterMethod = function () { return OuterInnerAlias.someExportedOuterInnerFunc(); };
        C.prototype.someMethodThatCallsAnInnerMethod = function () { return InnerMod.someExportedInnerFunc(); };
        C.prototype.someMethodThatCallsAnOuterInnerMethod = function () { return OuterMod.someExportedOuterFunc(); };
        C.prototype.someMethod = function () { return 0; };
        return C;
    }());
    M.C = C;
    var someModuleVar = 4;
    function someModuleFunction() { return 5; }
})(M || (M = {}));
(function (M) {
    M.c = M.x;
    M.meb = M.E.B;
})(M || (M = {}));
var cprime = null;
var c = new M.C();
var z = M.x;
var alpha = M.E.A;
var omega = M.exported_var;
c.someMethodThatCallsAnOuterMethod();
