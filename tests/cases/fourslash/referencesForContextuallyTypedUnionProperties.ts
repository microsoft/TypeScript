/// <reference path='fourslash.ts'/>

////interface A {
////    a: number;
////    /*1*/common: string;
////}
////
////interface B {
////    b: number;
////    /*2*/common: number;
////}
////
////// Assignment
////var v1: A | B = { a: 0, /*3*/common: "" };
////var v2: A | B = { b: 0, /*4*/common: 3 };
////
////// Function call
////function consumer(f:  A | B) { }
////consumer({ a: 0, b: 0, /*5*/common: 1 });
////
////// Type cast
////var c = <A | B> { /*6*/common: 0, b: 0 };
////
////// Array literal
////var ar: Array<A|B> = [{ a: 0, /*7*/common: "" }, { b: 0, /*8*/common: 0 }];
////
////// Nested object literal
////var ob: { aorb: A|B } = { aorb: { b: 0, /*9*/common: 0 } };
////
////// Widened type
////var w: A|B = { a:0, /*10*/common: undefined };
////
////// Untped -- should not be included
////var u1 = { a: 0, b: 0, common: "" };
////var u2 = { b: 0, common: 0 };

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7', '8', '9', '10')
