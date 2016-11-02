/// <reference path='fourslash.ts' />

//// abstract class C1 {
////     abstract f1<T extends number>();
//// }
////
//// class C2 extends C1 {[|
////
//// |]}

verify.rangeAfterCodeFix(`f1<T extends number>(){
    throw new Error('Method not Implemented');
}
`);
