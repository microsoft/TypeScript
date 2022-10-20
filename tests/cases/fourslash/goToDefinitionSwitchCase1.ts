/// <reference path="fourslash.ts" />

/////*end*/switch (null) {
////  [|/*start*/case|] null: break;
////}

verify.goToDefinition("start", "end");
