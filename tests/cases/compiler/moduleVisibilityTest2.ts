

module OuterMod {
	export function someExportedOuterFunc() { return -1; }

	export module OuterInnerMod {
		export function someExportedOuterInnerFunc() { return "foo"; }
	}
}

import OuterInnerAlias = OuterMod.OuterInnerMod;

module M {

	module InnerMod {
		export function someExportedInnerFunc() { return -2; }
	}

	enum E {
		A,
		B,
		C,
	}

	var x = 5;
	export declare var exported_var;

	var y = x + x;


	interface I {
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

module M {
	export var c = x;
	export var meb = M.E.B;
}

var cprime : M.I = <M.I>null;

var c = new M.C();
var z = M.x;
var alpha = M.E.A;
var omega = M.exported_var;
c.someMethodThatCallsAnOuterMethod();
