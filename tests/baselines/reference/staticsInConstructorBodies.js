//// [staticsInConstructorBodies.ts]
class C {
	constructor() {
		static p1 = 0; // ERROR
		static m1() {} // ERROR
	}
}

//// [staticsInConstructorBodies.js]
var C = (function () {
    function C() {
    }
    C.m1 = function () { }; // ERROR
    return C;
}());
C.p1 = 0; // ERROR
