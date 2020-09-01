///<reference path="fourslash.ts" />

//// function foo ([|/*def1*/a|]: string) {
////     /**
////      * @see {/*use1*/[|a|]}
////      */
////     function bar (a: string) {
////     }
//// }

goTo.marker("use1");
verify.goToDefinitionIs(["def1"]);
