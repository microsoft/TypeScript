/// <reference path='fourslash.ts' />

//// abstract class A<T> {
////    abstract f<T>();
//// }
////
//// class C<U> extends A<U> {[|
//// |]}

verify.rangeAfterCodeFix(`f<U>(){
    throw new Error('Method not Implemented');
}
`);