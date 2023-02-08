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

verify.goToDefinition("start1", []);
verify.goToDefinition("start2", "end2");
