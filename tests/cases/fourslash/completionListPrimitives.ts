/// <reference path="fourslash.ts"/>

/////**/

goTo.marker();
verify.completionListContains("any");
verify.completionListContains("boolean");
verify.completionListContains("null");
verify.completionListContains("number");
verify.completionListContains("string");
verify.completionListContains("undefined");
verify.completionListContains("void");