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
class C {
    constructor() {
    }
    static p1 = 0; // ERROR
    static m1() { } // ERROR
}
