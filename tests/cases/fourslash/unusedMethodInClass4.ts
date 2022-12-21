/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {
////    [|public function2(){
////    }
////    private function1 = function() {
////    } |]
////}

verify.codeFix({
    description: `Remove unused declaration for: 'function1'`,
    newRangeContent: `public function2(){
    }
`,
});
