/// <reference path='fourslash.ts'/>

// Should handle sub-namespaces

//// /*parentNamespace*/namespace Foo {
////     export function hello() {}
//// }
////
//// /*parentNamespace2*/namespace Foo./*childNamespace*/Bar {
////    export function okay() {}
//// }
////
//// Fo/*parentReference*/o.hello();
//// Foo.Ba/*childReference*/r.okay();

goTo.marker("parentReference");
goTo.implementation(0);
verify.caretAtMarker("parentNamespace");

goTo.marker("parentReference");
goTo.implementation(1);
verify.caretAtMarker("parentNamespace2");

goTo.marker("childReference");
goTo.implementation();
verify.caretAtMarker("childNamespace")