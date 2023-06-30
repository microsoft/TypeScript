/// <reference path='fourslash.ts'/>

// Should handle property access expressions on namespaces

//// namespace Foo {
////     export function [|hello|]() {}
//// }
////
//// Foo.hell/*reference*/o();

verify.baselineGoToImplementation("reference");