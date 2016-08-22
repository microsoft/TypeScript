/// <reference path='fourslash.ts'/>

// Should handle calls on modules

//// [|module Foo {
////     export function hello() {}
//// }|]
//// 
//// let x = Fo/*reference*/o;

goTo.marker("reference");
verify.allRangesAppearInImplementationList();