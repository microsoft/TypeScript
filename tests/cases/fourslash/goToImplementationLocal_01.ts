/// <reference path='fourslash.ts'/>

// Should return the defintion of locally defined variables

//// const [|hello|] = function() {};
//// he/*function_call*/llo();

verify.baselineGoToImplementation("function_call");
