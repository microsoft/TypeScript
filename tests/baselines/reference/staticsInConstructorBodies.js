//// [tests/cases/compiler/staticsInConstructorBodies.ts] ////

//// [staticsInConstructorBodies.ts]
class C {
	constructor() {
		static p1 = 0; // ERROR
		static m1() {} // ERROR
	}
}

//// [staticsInConstructorBodies.js]
let C = (() => {
    class C {
        constructor() {
        }
        static m1() { } // ERROR
    }
    C.p1 = 0; // ERROR
    return C;
})();
