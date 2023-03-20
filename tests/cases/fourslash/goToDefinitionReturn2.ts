/// <reference path="fourslash.ts" />

////function foo() {
////    return /*end*/() => {
////        [|/*start*/return|] 10;
////    }
////}

verify.goToDefinition("start", "end");
