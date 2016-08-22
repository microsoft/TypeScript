/// <reference path='fourslash.ts'/>

//// const x = { [|hello: () => {}|] };
////
//// x.he/*function_call*/llo();
////
goTo.marker("function_call");
verify.allRangesAppearInImplementationList();