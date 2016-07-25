/// <reference path='fourslash.ts'/>

// Should return definition of locally declared functions

//// he/*function_call*/llo();
//// [|function hello() {}|]

goTo.marker("function_call");
verify.allRangesAppearInImplementationList();