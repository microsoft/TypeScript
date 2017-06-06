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
}`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
