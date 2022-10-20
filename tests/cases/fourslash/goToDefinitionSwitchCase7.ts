/// <reference path="fourslash.ts" />

////switch (null) {
////  case null:
////    /*end*/export [|/*start*/default|] 123;

verify.goToDefinition("start", "end");
