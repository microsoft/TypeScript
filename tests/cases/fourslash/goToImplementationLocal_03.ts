/// <reference path='fourslash.ts'/>

// Should return the definition when invoked on variable assignment

//// let [|he/*local_var*/llo = {}|];
////
//// x.hello();
////
//// hello = {};
////
goTo.marker("local_var");
verify.allRangesAppearInImplementationList();