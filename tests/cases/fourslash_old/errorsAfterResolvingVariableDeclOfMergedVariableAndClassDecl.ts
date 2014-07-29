/// <reference path="fourslash.ts" />


////module M {
////    export class C {
////        foo() { }
////    }
////    export module C {
////        export var /*1*/C = M.C;
////    }
////}

diagnostics.setEditValidation(IncrementalEditValidation.None);

verify.numberOfErrorsInCurrentFile(0);

// Edit and bind and resolve only var decl
goTo.marker("1");
edit.backspace(1);
edit.insert(" ");
verify.quickInfoIs("typeof C", undefined, "M.C.C", "var");

// Verify there are no errors
verify.numberOfErrorsInCurrentFile(0);
