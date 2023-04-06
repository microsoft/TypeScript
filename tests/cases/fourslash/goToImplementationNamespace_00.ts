/// <reference path='fourslash.ts'/>

// Should handle namespace and module implementations

//// namespace /*implementation0*/Foo {
////     export function hello() {}
//// }
////
//// module /*implementation1*/Bar {
////     export function sure() {}
//// }
////
//// let x = Fo/*reference0*/o;
//// let y = Ba/*reference1*/r;

verify.baselineGoToImplementation("reference0", "reference1");