/// <reference path="fourslash.ts" />

//// class C {
////     notAGenerator() {
////       [|/*start1*/yield|] 0;
////     }
////
////     foo*/*end2*/() {
////       [|/*start2*/yield|] 0;
////     }
//// }

verify.baselineGoToDefinition(
    "start1",
    "start2",
);
