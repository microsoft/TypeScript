/// <reference path="fourslash.ts" />

//// async function /*end1*/foo() {
////     [|/*start1*/await|] Promise.resolve(0);
//// }

//// function notAsync() {
////     [|/*start2*/await|] Promise.resolve(0);
//// }

verify.baselineGoToDefinition(
    "start1",
    "start2"
);
