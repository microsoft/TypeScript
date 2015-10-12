/// <reference path="fourslash.ts" />

//// type T = number;
//// var x;
//// var y = x as /**/

goTo.marker();
verify.completionListContains('T');
