/// <reference path="fourslash.ts" />

////switch (null) {
////  case null:
////    export [|/*start*/default|] 123;

verify.baselineGoToDefinition("start");
