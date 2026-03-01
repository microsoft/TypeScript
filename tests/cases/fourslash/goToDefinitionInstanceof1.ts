/// <reference path="fourslash.ts" />

// @lib: es5

//// class /*end*/ C {
//// }
//// declare var obj: any;
//// obj [|/*start*/instanceof|] C;

verify.baselineGoToDefinition("start");
