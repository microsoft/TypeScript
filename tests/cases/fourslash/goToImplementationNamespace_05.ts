/// <reference path='fourslash.ts'/>

// Should handle namespace and module implementations with qualified names

//// namespace /*implementation0*/Foo./*implementation2*/Baz {
////     export function hello() {}
//// }
////
//// module /*implementation1*/Bar./*implementation3*/Baz {
////     export function sure() {}
//// }
////
//// let x = Fo/*reference0*/o;
//// let y = Ba/*reference1*/r;
//// let x1 = Foo.B/*reference2*/az;
//// let y1 = Bar.B/*reference3*/az;

verify.baselineGoToImplementation("reference0", "reference1", "reference2", "reference3");