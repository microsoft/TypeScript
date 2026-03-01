/// <reference path="fourslash.ts" />
////enum E {
////    /** {@link /*1*/[|B|]} */
////    A,
////    [|/*2*/B|]
////}

verify.baselineGetDefinitionAtPosition("1");
