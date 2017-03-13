/// <reference path='fourslash.ts' />

//// abstract class A<T> {
////    abstract f(x: T): T;
//// }
////
//// class C<U> extends A<U> {[| |]}

verify.rangeAfterCodeFix(`f(x: U): U{
    throw new Error("Method not implemented.");
}
`);