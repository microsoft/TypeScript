/// <reference path="fourslash.ts" />

////function foo() {
////    return /*end*/function () {
////        [|/*start*/return|] 10;
////    }
////}

verify.baselineGoToDefinition("start");
