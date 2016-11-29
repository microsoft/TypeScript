/// <reference path='fourslash.ts' />

//// interface I {
////     f(x: number, y: string)
//// }
////
//// class C implements I {[|
//// |]}

verify.rangeAfterCodeFix(`
f(x: number,y: string){
    throw new Error('Method not implemented.');
}
`);
