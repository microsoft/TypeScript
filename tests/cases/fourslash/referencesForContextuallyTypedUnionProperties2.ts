/// <reference path='fourslash.ts'/>

////interface A {
////    a: number;
////    common: string;
////}
////
////interface B {
////    /*1*/b: number;
////    common: number;
////}
////
////// Assignment
////var v1: A | B = { a: 0, common: "" };
////var v2: A | B = { b: 0, common: 3 };
////
////// Function call
////function consumer(f:  A | B) { }
////consumer({ a: 0, b: 0, common: 1 });
////
////// Type cast
////var c = <A | B> { common: 0, b: 0 };
////
////// Array literal
////var ar: Array<A|B> = [{ a: 0, common: "" }, { b: 0, common: 0 }];
////
////// Nested object literal
////var ob: { aorb: A|B } = { aorb: { b: 0, common: 0 } };
////
////// Widened type
////var w: A|B = { b:undefined, common: undefined };
////
////// Untped -- should not be included
////var u1 = { a: 0, b: 0, common: "" };
////var u2 = { b: 0, common: 0 };

verify.baselineFindAllReferences('1')
