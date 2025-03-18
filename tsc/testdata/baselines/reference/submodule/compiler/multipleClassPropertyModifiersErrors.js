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
class C {
    p1;
    p2;
    static static;
    p3;
    p4;
    p5;
    static p6;
    static p7;
}
