//// [tests/cases/compiler/multipleClassPropertyModifiers.ts] ////

//// [multipleClassPropertyModifiers.ts]
class C {
    public static p1;
    static public p2;
    private static p3;
    static private p4;
}

//// [multipleClassPropertyModifiers.js]
class C {
    static p1;
    static p2;
    static p3;
    static p4;
}
