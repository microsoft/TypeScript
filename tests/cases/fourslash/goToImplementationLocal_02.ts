/// <reference path='fourslash.ts'/>

//// const x = { [|hello: () => {}|] };
////
//// x.he/*function_call*/llo();
////

verify.allRangesAppearInImplementationList("function_call");