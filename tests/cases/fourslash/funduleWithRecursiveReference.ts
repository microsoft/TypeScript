/// <reference path='fourslash.ts'/>

////module M {
////    export function C() {}
////    export module C {
////    export var /**/C = M.C
////  }
////}

verify.quickInfoAt("", "var M.C.C: typeof M.C");
verify.noErrors();