//// [tests/cases/compiler/multipleClassPropertyModifiersErrors.ts] ////

//// [multipleClassPropertyModifiersErrors.ts]
class C {
	public public p1;
	private private p2;
	static static p3;
	public private p4;
	private public p5;
	public static p6;
	private static p7;
}

//// [multipleClassPropertyModifiersErrors.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
