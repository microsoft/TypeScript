/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
////class greeter {
////    public function1() {
////        [| var x, y; |]
////        use(y);
////    }
////}

verify.rangeAfterCodeFix("var  y;", /*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 0);
