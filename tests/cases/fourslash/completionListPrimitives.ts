/// <reference path="fourslash.ts"/>

/////**/

goTo.marker();
verify.completionListContains("any");
verify.completionListContains("boolean");
verify.completionListContains("null");
verify.completionListContains("number");
verify.completionListContains("string");
verify.completionListContains("undefined", undefined, undefined, undefined, undefined, undefined, { allowDuplicate: true }); // TODO: GH#20042
verify.completionListContains("void");
