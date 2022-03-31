/// <reference path='fourslash.ts'/>

//// const x = { [|hello|]: () => {} };
////
//// x.they/*function_call*/llo();
////

verify.allRangesAppearInImplementationList("function_call");
