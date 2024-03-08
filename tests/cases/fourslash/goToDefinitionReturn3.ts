/// <reference path="fourslash.ts" />

////class C {
////    /*end*/m() {
////        [|/*start*/return|] 1;
////    }
////}

verify.baselineGoToDefinition("start");
