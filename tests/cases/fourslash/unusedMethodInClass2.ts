/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {
////    public function2() {
////    }/*0*/
////    private function1() {
////    }/*1*/
////}

verify.codeFixAtPosition(`
class greeter {
    public function2() {
    }
}`);
