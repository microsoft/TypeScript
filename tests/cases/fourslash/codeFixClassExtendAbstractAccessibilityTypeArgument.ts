/// <reference path='fourslash.ts' />

//// namespace N {
////     const enum Inaccessible {
////         member
////     };
////     abstract class A<T> {
////         abstract x: T;
////         abstract y: this;
////     }
////     export abstract class InaccessibleA extends A<Inaccessible> { }
//// }
////
//// class C extends N.InaccessibleA {[| |]}

verify.rangeAfterCodeFix(`
    y: this;
`);