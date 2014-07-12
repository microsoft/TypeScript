///<reference path="fourslash.ts" />

////var x = Object.create(/**/

diagnostics.setEditValidation(IncrementalEditValidation.None);
goTo.marker();
verify.not.completionListIsEmpty();
edit.insert("nu");
verify.completionListContains("number", undefined, undefined, undefined, "primitive type");