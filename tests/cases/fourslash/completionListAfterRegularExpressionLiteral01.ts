/// <reference path="fourslash.ts" />

////let v = 100;
/////a/./**/

goTo.marker();
verify.not.completionListContains('v');
verify.completionListContains('compile');