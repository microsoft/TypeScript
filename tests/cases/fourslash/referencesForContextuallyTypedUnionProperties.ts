/// <reference path='fourslash.ts'/>

////interface A {
////    a: number;
////    common: string;
////}
////
////interface B {
////    b: number;
////    common: number;
////}
////
////// Assignment
////var v1: A | B = { a: 0, /*1*/common: "" };
////var v2: A | B = { b: 0, /*2*/common: 3 };
////
////// Function call
////function consumer(f:  A | B) { }
////consumer({ a: 0, b: 0, /*3*/common: 1 });
////
////// Type cast 
////var c = <A | B> { /*4*/common: 0, b: 0 };
////
////// Array literal
////var ar: Array<A|B> = [{ a: 0, /*5*/common: "" }, { b: 0, /*6*/common: 0 }];
////
////// Nested object literal
////var ob: { aorb: A|B } = { aorb: { b: 0, /*7*/common: 0 } };
////
////// Widened type
////var w: A|B = { a:0, /*8*/common: undefined };
////
////// Untped -- should not be included
////var u1 = { a: 0, b: 0, common: "" };
////var u2 = { b: 0, common: 0 };

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.referencesCountIs(10); // 8 contextually typed common, and 2 in definition (A.common, B.common)
});
