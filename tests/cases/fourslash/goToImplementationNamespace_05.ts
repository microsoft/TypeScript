/// <reference path='fourslash.ts'/>

// Should handle sub-modules

//// /*parentModule*/module Foo {
////     export function hello() {}
//// }
////
//// /*parentModule2*/module Foo./*childModule*/Bar {
////    export function okay() {}
//// }
////
//// Fo/*parentReference*/o.hello();
//// Foo.Ba/*childReference*/r.okay();

goTo.marker("parentReference");
goTo.implementation(0);
verify.caretAtMarker("parentModule");

goTo.marker("parentReference");
goTo.implementation(1);
verify.caretAtMarker("parentModule2");

goTo.marker("childReference");
goTo.implementation();
verify.caretAtMarker("childModule")