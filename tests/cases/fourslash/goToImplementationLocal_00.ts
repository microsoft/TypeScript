/// <reference path='fourslash.ts'/>

//// he/*function_call*/llo();
//// [|function hello() {}|]

goTo.marker("function_call");
verify.allRangesAppearInImplementationList();