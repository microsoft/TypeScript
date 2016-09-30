/// <reference path='fourslash.ts'/>

////class C {
////    public /*1*/1() { }
////    private /*2*/Infinity() { }
////    protected /*3*/NaN() { }
////    static /*4*/"stringLiteralName"() { }
////    method() {
////        this[/*5*/1]();
////        this[/*6*/"1"]();
////        this./*7*/Infinity();
////        this[/*8*/"Infinity"]();
////        this./*9*/NaN();
////        C./*10*/stringLiteralName();
////    }

verify.baselineQuickInfo();