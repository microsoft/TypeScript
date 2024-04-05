/// <reference path="fourslash.ts" />

//// async function outerAsyncFun() {
////     let /*end*/af = async () => {
////       [|/*start*/await|] Promise.resolve(0);
////     }
//// }

verify.baselineGoToDefinition("start");
