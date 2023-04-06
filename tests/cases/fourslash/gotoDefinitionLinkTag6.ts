/// <reference path="fourslash.ts" />

////enum E {
////    /** {@link E./*1*/[|A|]} */
////    [|/*2*/A|]
////}

verify.baselineGetDefinitionAtPosition("1");
