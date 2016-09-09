/// <reference path='fourslash.ts'/>

// Should handle namespace and module implementations with qualified names

//// /*implementation0*/namespace Foo./*implementation2*/Baz {
////     export function hello() {}
//// }
////
//// /*implementation1*/module Bar./*implementation3*/Baz {
////     export function sure() {}
//// }
////
//// let x = Fo/*reference0*/o;
//// let y = Ba/*reference1*/r;
//// let x1 = Foo.B/*reference2*/az;
//// let y1 = Bar.B/*reference3*/az;

for (let i = 0; i < 4; i ++) {
    goTo.marker("reference" + i);
    goTo.implementation();
    verify.caretAtMarker("implementation" + i);
}