/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {
////    [|public function2(){
////    }
////    private function1 = function() {
////    } |]
////}

verify.rangeAfterCodeFix(`public function2(){
}`);
