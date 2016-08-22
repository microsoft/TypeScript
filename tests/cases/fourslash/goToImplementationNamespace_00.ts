/// <reference path='fourslash.ts'/>

// Should handle calls on namespaces

//// [|namespace Foo {
////     export function hello() {}
//// }|]
//// 
//// let x = Fo/*reference*/o;

goTo.marker("reference");
verify.allRangesAppearInImplementationList();