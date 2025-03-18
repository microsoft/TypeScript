//// [tests/cases/compiler/unexportedInstanceClassVariables.ts] ////

//// [unexportedInstanceClassVariables.ts]
module M{
	class A{
		constructor(val:string){}
	}
}

module M{
	class A {}  
 
 	var a = new A();
}


//// [unexportedInstanceClassVariables.js]
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
