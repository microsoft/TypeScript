/// <reference path='fourslash.ts' />

//// interface I<T> {
////    x: { y: T, z: T[] };
//// }
//// 
//// class C implements I<number> { }

verify.fileAfterCodeFix(`
interface I<T> {
   x: { y: T, z: T[] };
}

class C implements I<number> {
    x: { y: number; z: number[]; };
} 
`);
