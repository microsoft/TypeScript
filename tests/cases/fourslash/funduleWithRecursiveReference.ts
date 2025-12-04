/// <reference path='fourslash.ts'/>

////namespace M {
////    export function C() {}
////    export namespace C {
////    export var /**/C = M.C
////  }
////}

verify.quickInfoAt("", "var M.C.C: typeof M.C");
verify.noErrors();