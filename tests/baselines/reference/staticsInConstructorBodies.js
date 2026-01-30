//// [tests/cases/compiler/staticsInConstructorBodies.ts] ////

//// [staticsInConstructorBodies.ts]
class C {
	constructor() {
		static p1 = 0; // ERROR
		static m1() {} // ERROR
	}
}

//// [staticsInConstructorBodies.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    C.m1 = function () { }; // ERROR
    C.p1 = 0; // ERROR
    return C;
}());
