/// <reference path='fourslash.ts' />

//// abstract class A<T> {
////    abstract f<T>(x: T);
//// }
////
//// class C extends A<number> {[|
//// |]}

verify.rangeAfterCodeFix(`f(x: number){
    throw new Error('Method not Implemented');
}
`);