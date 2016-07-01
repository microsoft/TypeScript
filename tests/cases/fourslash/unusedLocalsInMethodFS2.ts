/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
////class greeter {
////    public function1() {
////        var /*0*/x,/*1*/ y;
////        y = 1;
////    }
////}

verify.codeFixAtPosition(`
class greeter {
    public function1() {
        var  y;
        y = 1;
    }
}`);
