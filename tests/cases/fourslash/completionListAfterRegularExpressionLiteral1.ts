/// <reference path="fourslash.ts" />

/////a/./**/

goTo.marker();
verify.not.completionListContains('alert');
verify.completionListContains('compile');