/// <reference path='fourslash.ts' />

//// namespace N1 {
////     export interface I1 {
////         f1(x: number, y: string)
////     }
//// }
//// interface I1 {
////     f1();
//// }
////
//// class C1 implements N1.I1 {[|
//// |]}

verify.rangeAfterCodeFix(`f1(x: number,y: string){
    throw new Error('Method not Implemented');
}
`);
