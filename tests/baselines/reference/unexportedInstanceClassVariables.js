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
    var A = (function () {
        function A(val) {
        }
        return A;
    }());
})(M || (M = {}));
(function (M) {
    var A = (function () {
        function A() {
        }
        return A;
    }());
    var a = new A();
})(M || (M = {}));
