/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////[|class greeter {
////    private function1 = function() {
////    }
////} |]

verify.codeFixAtPosition(`
class greeter {
}`);
