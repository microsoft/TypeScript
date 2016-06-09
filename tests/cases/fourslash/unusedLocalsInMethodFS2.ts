/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
////class greeter {
////    public function1() {
////        var /*0*/x,/*1*/ y;
////        y = 1;
////    }
////}

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "" });
