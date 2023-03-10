/// <reference path="fourslash.ts" />

//// function* /*end1*/gen() {
////     [|/*start1*/yield|] 0;
//// }
////
//// const /*end2*/genFunction = function*() {
////     [|/*start2*/yield|] 0;
//// }

verify.goToDefinition("start1", "end1");
verify.goToDefinition("start2", "end2");
