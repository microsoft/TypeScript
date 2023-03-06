/// <reference path="fourslash.ts" />

////enum E {
////    /** {@link /*1*/[|A|]} */
////    [|/*2*/A|]
////}

goTo.marker("1");
verify.goToDefinitionIs("2");
