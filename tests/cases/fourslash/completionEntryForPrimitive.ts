///<reference path="fourslash.ts" />

////var x = Object.create(/**/

goTo.marker();
verify.not.completionListIsEmpty();
edit.insert("nu");
verify.completionListContains("number", undefined, undefined, "keyword");