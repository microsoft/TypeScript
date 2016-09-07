/// <reference path='fourslash.ts'/>

// Should not return results on namespaces and modules

//// namespace Foo {
////     export function hello() {}
//// }
////
//// namespace Foo.Bar {
////     export function okay() {}
//// }
////
//// namespace Baz {
////     export function sure() {}
//// }
////
//// namespace Baz.Bar {
////     export function alright() {}
//// }
////
//// let w = Fo/*reference0*/o;
//// let x = Foo.B/*reference1*/ar;
//// let w = Ba/*reference2*/z;
//// let x = Baz.B/*reference3*/ar;

for (let i = 0; i < 4; i++) {
    goTo.marker("reference" + i);
    verify.implementationCountIs(0);
}