/// <reference path="fourslash.ts" />

////type T = /**/

goTo.marker();
verify.completionListContains("undefined", "undefined", undefined, "keyword");
verify.not.completionListContains("await");
