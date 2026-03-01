/// <reference path='fourslash.ts'/>

// Should return definition of function when invoked on the declaration

//// function [|he/*local_var*/llo|]() {}
////
//// hello();
////

verify.baselineGoToImplementation("local_var");
