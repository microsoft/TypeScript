/// <reference path="fourslash.ts" />

////"an unclosed string is a terrible thing!
////
////class foo { public x() { } }
////var f = new foo();
////f./**/

goTo.marker();
// Error recovery for unclosed string literals
verify.completionListContains('x');
