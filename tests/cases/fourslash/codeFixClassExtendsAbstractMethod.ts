/// <reference path='fourslash.ts' />

//// abstract class A {
////    abstract f();
//// }
////
//// class C extends A {[|
//// |]}

verify.rangeAfterCodeFix(`f(){
    throw new Error('Method not implemented.');
}
`);