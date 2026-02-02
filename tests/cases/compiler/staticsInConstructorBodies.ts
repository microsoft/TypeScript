// @target: es2015
class C {
	constructor() {
		static p1 = 0; // ERROR
		static m1() {} // ERROR
	}
}