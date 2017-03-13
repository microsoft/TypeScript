/// <reference path='fourslash.ts' />

//// abstract class A<T> {
////    abstract f(x: T): T;
//// }
////
//// class C extends A<number> {[| |]}

verify.rangeAfterCodeFix(`f(x: number): number{
    throw new Error("Method not implemented.");
}
`);