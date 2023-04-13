/// <reference path='fourslash.ts'/>

// Should handle calls made on members declared in a class

//// class Bar {
////     [|{|"parts": ["(","method",")"," ","Bar",".","hello","(",")",":"," ","void"], "kind": "method"|}hello|]() {}
//// }
////
//// new Bar().hel/*reference*/lo;

verify.baselineGoToImplementation("reference");