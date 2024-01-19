/// <reference path="fourslash.ts" />

//// class /*end*/ C {
//// }
//// declare var obj: any;
//// obj [|/*start*/instanceof|] C;

verify.baselineGoToDefinition("start");
