/// <reference path="fourslash.ts" />

/////**/

diagnostics.setEditValidation(IncrementalEditValidation.None);
edit.replace(0, 0, "function foo(bar) {\n    b\n}\n");
goTo.position(27);
FourSlash.currentTestState.getCompletionListAtCaret().entries
  .forEach(entry => FourSlash.currentTestState.getCompletionEntryDetails(entry.name));
