/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////[| class greeter {
////    private function1() {
////    }
////} |]

verify.rangeAfterCodeFix(`
class greeter {
}`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
