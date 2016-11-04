/// <reference path='fourslash.ts' />

//// interface I<T> {
////    x: T;
//// }
////
//// class C<U> implements I<U> { } 

verify.fileAfterCodeFix(`
interface I<T> {
   x: T;
}

class C<U> implements I<U> {
    x: U;
} 
`);
