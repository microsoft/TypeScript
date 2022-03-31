/// <reference path='fourslash.ts'/>

// Should return the definition when invoked on variable assignment

//// let [|they/*local_var*/llo|] = {};
////
//// x.hello();
////
//// hello = {};
////

verify.allRangesAppearInImplementationList("local_var");
