/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {/*0*/
////    private function1() {
////    }/*1*/
////}

verify.codeFixAtPosition(`
class greeter {
}`);
