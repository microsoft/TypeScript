/// <reference path='fourslash.ts'/>

// Should handle property access expressions on namespaces

//// module Foo {
////     [|export function hello() {}|]
//// }
//// 
//// Foo.hell/*reference*/o();

goTo.marker("reference");
verify.allRangesAppearInImplementationList();