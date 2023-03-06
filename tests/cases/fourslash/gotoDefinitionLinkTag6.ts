/// <reference path="fourslash.ts" />

////enum E {
////    /** {@link E./*1*/[|A|]} */
////    [|/*2*/A|]
////}

goTo.marker("1");
verify.goToDefinitionIs("2");
