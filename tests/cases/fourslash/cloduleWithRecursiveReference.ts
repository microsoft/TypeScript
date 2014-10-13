/// <reference path='fourslash.ts'/>

////module M {
////    export class C {
////        foo() { }
////    }
////    export module C {
////    export var /**/C = M.C
////  }
////}

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker();
verify.quickInfoIs('(var) M.C.C: typeof M.C');
verify.numberOfErrorsInCurrentFile(0);