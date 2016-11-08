/// <reference path='fourslash.ts' />

//// abstract class A<T> {
////    abstract f<T>(x: T);
//// }
////
//// class C<U> extends A<U> {[|
//// |]}

verify.rangeAfterCodeFix(`f(x: U){
    throw new Error('Method not Implemented');
}
`);