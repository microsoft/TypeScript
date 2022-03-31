/// <reference path='fourslash.ts'/>

// Should return definition of function when invoked on the declaration

//// function [|they/*local_var*/llo|]() {}
////
//// hello();
////

verify.allRangesAppearInImplementationList("local_var");
