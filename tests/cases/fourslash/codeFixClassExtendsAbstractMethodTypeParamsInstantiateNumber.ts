/// <reference path='fourslash.ts' />

//// abstract class A<T> {
////    abstract f<T>();
//// }
////
//// class C extends A<number> {[|
//// |]}

verify.rangeAfterCodeFix(`f<number>(){
    throw new Error('Method not Implemented');
}
`);