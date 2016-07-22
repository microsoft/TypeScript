/// <reference path='fourslash.ts'/>

//// const [|hello = function() {}|];
//// he/*function_call*/llo();

goTo.marker("function_call");
verify.allRangesAppearInImplementationList();