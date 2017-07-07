/// <reference path='fourslash.ts'/>

// This used to cause a crash because we would ask for exports on `"x"`,
// which would return undefined and cause a NPE. Now we return emptySymbol instead.
// See GH#16610.

////declare module "x" {
////    declare var x: number;
////    export = x;
////}
////
////let y: /**/

goTo.marker();
// This is just a dummy test to cause `getCompletionsAtPosition` to be called.
verify.not.completionListContains("x");
