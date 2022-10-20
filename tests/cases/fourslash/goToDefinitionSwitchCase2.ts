/// <reference path="fourslash.ts" />

/////*end*/switch (null) {
////  [|/*start*/default|]: break;
////}

verify.goToDefinition("start", "end");
