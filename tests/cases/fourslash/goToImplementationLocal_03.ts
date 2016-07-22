/// <reference path='fourslash.ts'/>

//// const he/*local_var*/llo = [|{}|];
////
//// x.hello();
////
//// hello = {};
////
goTo.marker("local_var");
verify.allRangesAppearInImplementationList();