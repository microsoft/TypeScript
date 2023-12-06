/// <reference path="fourslash.ts" />

////function /*end*/foo() {
////    [|/*start*/return|] 10;
////}

verify.baselineGoToDefinition("start");
