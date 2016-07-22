/// <reference path='fourslash.ts'/>

//// [|function he/*local_var*/llo() {}|]
////
//// hello();
////
goTo.marker("local_var");
verify.allRangesAppearInImplementationList();