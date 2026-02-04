//// [tests/cases/compiler/unexportedInstanceClassVariables.ts] ////

//// [unexportedInstanceClassVariables.ts]
namespace M{
	class A{
		constructor(val:string){}
	}
}

namespace M{
	class A {}  
 
 	var a = new A();
}


//// [unexportedInstanceClassVariables.js]
"use strict";
var M;
(function (M) {
    class A {
        constructor(val) { }
    }
})(M || (M = {}));
(function (M) {
    class A {
    }
    var a = new A();
})(M || (M = {}));
