/// <reference path='fourslash.ts' />

//// abstract class C1 { }
//// abstract class C2 {
////     abstract f1<T extends number>();
//// }
//// interface I1 extends C1, C2 { }
//// class C3 implements I1 {[| |]}

verify.rangeAfterCodeFix(`f1<T extends number>(){
    throw new Error("Method not implemented.");
}
`);