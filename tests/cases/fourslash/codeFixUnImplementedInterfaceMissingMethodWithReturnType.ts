/// <reference path='fourslash.ts' />

//// interface I {
////     f1(): string;
//// }
////
//// class C implements I {[|
//// |]}

verify.rangeAfterCodeFix(`f1(): string {
    throw new Error('Method not implemented.');
}
`);
