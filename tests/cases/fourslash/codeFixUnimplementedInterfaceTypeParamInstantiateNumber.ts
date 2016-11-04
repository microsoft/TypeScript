/// <reference path='fourslash.ts' />

//// interface I<T> {
////    x: T;
//// }
////
//// class C implements I<number> { } 

verify.fileAfterCodeFix(`
interface I<T> {
   x: T;
}

class C implements I<number> {
    x: number;
} 
`);
