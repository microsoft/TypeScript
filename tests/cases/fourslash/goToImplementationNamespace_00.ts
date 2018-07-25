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

for (let i = 0; i < 2; i ++) {
    goTo.marker("reference" + i);
    goTo.implementation();
    verify.caretAtMarker("implementation" + i);
}