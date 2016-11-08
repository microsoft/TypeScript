/// <reference path='fourslash.ts' />

//// interface I1 {
////     x: number;
//// }
//// interface I2 {
////     x: string;
//// }
////
//// class C1 implements I1,I2 {[|
//// |]}

verify.fileAfterCodeFix(`
interface I1 {
     x: number;
 }
 interface I2 {
     x: string;
 }

 class C1 implements I1,I2 {
     x: number & string;
}
`);
