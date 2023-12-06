/// <reference path='fourslash.ts'/>

//// const x = { [|hello|]: () => {} };
////
//// x.he/*function_call*/llo();
////

verify.baselineGoToImplementation("function_call");
