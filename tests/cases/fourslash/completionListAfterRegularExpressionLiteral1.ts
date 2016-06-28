/// <reference path="fourslash.ts" />

/////a/./**/

goTo.marker();
verify.not.memberListContains('alert');
verify.memberListContains('compile');