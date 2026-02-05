/// <reference path='fourslash.ts' />

// @strict: false
// @noImplicitOverride: true
//// abstract class A {
////    abstract x: number;
////    abstract y: number;
////    abstract z: number;
//// }
////
//// class C extends A {[|   
////    |]constructor(public x: number) { super(); }
////    y: number;
//// }

verify.rangeAfterCodeFix(`
override z: number;
`);
