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

verify.goToDefinition("start1", []);
verify.goToDefinition("start2", "end2");
