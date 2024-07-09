/// <reference path="fourslash.ts" />

////enum E {
////    /** {@link /*1*/[|A|]} */
////    [|/*2*/A|]
////}

verify.baselineGetDefinitionAtPosition("1");