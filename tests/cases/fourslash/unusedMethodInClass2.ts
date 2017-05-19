/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| class greeter {
////    public function2() {
////    }
////    private function1() {
////    }
////} |]

verify.rangeAfterCodeFix(`
class greeter {
    public function2() {
    }
}`);
