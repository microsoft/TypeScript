/// <reference path="fourslash.ts" />

////switch (null) {
////  [|/*start*/default|]: break;
////}

verify.baselineGoToDefinition("start");
