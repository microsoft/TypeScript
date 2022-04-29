/// <reference path="fourslash.ts" />


////module M {
////    export class C {
////        foo() { }
////    }
////    export module C {
////        export var /*1*/C = M.C;
////    }
////}

verify.noErrors();

// Edit and bind and resolve only var decl
goTo.marker("1");
edit.backspace(1);
edit.insert(" ");
verify.quickInfoIs("var M.C.C: typeof M.C");

verify.noErrors();
