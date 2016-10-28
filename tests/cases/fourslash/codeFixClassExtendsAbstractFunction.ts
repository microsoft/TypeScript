/// <reference path='fourslash.ts' />

//// abstract class A {
////    abstract f();
//// }
////
//// class C extends A {[|
//// |]}

verify.codeFixAtPosition(`f(){
    throw new Error('Method not Implemented');
}
`);