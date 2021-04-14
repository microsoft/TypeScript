/// <reference path="fourslash.ts" />
//// class C {
////     m/*1*/() { }
////     n/*2*/ = 1
////     static s/*3*/() { }
////     /**
////      * {@link m}
////      * @see {m}
////      * {@link C.m}
////      * @see {C.m}
////      * {@link C#m}
////      * @see {C#m}
////      * {@link C.prototype.m}
////      * @see {C.prototype.m}
////      */
////     p() { }
////     /**
////      * {@link n}
////      * @see {n}
////      * {@link C.n}
////      * @see {C.n}
////      * {@link C#n}
////      * @see {C#n}
////      * {@link C.prototype.n}
////      * @see {C.prototype.n}
////      */
////     q() { }
////     /**
////      * {@link s}
////      * @see {s}
////      * {@link C.s}
////      * @see {C.s}
////      */
////     r() { }
//// }
////
//// interface I {
////     a/*4*/()
////     b/*5*/: 1
////     /**
////      * {@link a}
////      * @see {a}
////      * {@link I.a}
////      * @see {I.a}
////      */
////     c()
////     /**
////      * {@link b}
////      * @see {b}
////      * {@link I.b}
////      * @see {I.b}
////      */
////     d()
//// }
////
//// function nestor() {
////     /** {@link r2} */
////     function ref() { }
////     /** @see {r2} */
////     function d3() { }
////     function r2/*6*/() { }
//// }

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6')
