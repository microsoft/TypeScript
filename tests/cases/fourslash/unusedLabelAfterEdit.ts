/// <reference path="fourslash.ts" />

// @allowUnusedLabels: false

//// myLabel: while (true) {
////     if (Math.random() > 0.5) {
////         /*marker*/break myLabel;
////     }
//// }

verify.numberOfErrorsInCurrentFile(0);

goTo.marker("marker");
edit.deleteAtCaret("break myLabel;".length);
edit.insert("break;");

verify.numberOfErrorsInCurrentFile(1);

goTo.marker("marker");
edit.deleteAtCaret("break;".length);
edit.insert("break myLabel;");

verify.numberOfErrorsInCurrentFile(0);
