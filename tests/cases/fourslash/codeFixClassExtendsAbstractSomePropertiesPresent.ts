/// <reference path='fourslash.ts' />

//// abstract class A {
////    abstract x: number;
////    abstract y: number;
////    abstract z: number;
//// }
////
//// class C extends A {[|   |]
////    constructor(public x: number) { }
////    y: number;
//// }

verify.rangeAfterCodeFix(`
z: number;
`);
