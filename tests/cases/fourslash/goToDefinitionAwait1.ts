/// <reference path="fourslash.ts" />

//// async function /*end1*/foo() {
////     [|/*start1*/await|] Promise.resolve(0);
//// }

//// function notAsync() {
////     [|/*start2*/await|] Promise.resolve(0);
//// }

verify.goToDefinition("start1", "end1");
verify.goToDefinition("start2", []);
