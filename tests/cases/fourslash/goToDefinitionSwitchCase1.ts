/// <reference path="fourslash.ts" />

////switch (null ) {
////  [|/*start*/case|] null: break;
////}

verify.baselineGoToDefinition("start");
