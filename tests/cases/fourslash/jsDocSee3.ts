///<reference path="fourslash.ts" />

//// function foo ([|/*def1*/a|]: string) {
////     /**
////      * @see {/*use1*/[|a|]}
////      */
////     function bar ([|/*def2*/a|]: string) {
////     }
//// }

verify.baselineGetDefinitionAtPosition("use1");
