/// <reference path='fourslash.ts'/>

// Should return the defintion of locally defined variables

//// const [|hello = function() {}|];
//// he/*function_call*/llo();

goTo.marker("function_call");
verify.allRangesAppearInImplementationList();