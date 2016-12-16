/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////[| class greeter {
////    private function1() {
////    }
////} |]

verify.codeFixAtPosition(`
class greeter {
}`);
