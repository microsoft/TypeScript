/// <reference path="fourslash.ts" />

//// function* outerGen() {
////     function* /*end*/gen() {
////         [|/*start*/yield|] 0;
////     }
////     return gen
//// }

verify.baselineGoToDefinition("start");
