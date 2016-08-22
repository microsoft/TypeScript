/// <reference path='fourslash.ts'/>

// Should handle calls made on members declared in a class

//// class Bar {
////     [|hello() {}|]
//// }
////
//// new Bar().hel/*reference*/lo;

goTo.marker("reference");
verify.allRangesAppearInImplementationList();