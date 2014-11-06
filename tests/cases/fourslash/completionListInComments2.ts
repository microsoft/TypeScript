/// <reference path='fourslash.ts' />

//// // */{| "name" : "1" |}

goTo.marker("1");
// Completion list should not be available within comments
verify.completionListIsEmpty();
