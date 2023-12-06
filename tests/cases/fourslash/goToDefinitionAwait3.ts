/// <reference path="fourslash.ts" />

//// class C {
////     notAsync() {
////       [|/*start1*/await|] Promise.resolve(0);
////     }
////
////     async /*end2*/foo() {
////       [|/*start2*/await|] Promise.resolve(0);
////     }
//// }

verify.baselineGoToDefinition(
    "start1",
    "start2"
);
