/// <reference path="fourslash.ts" />
////enum E {
////    /** {@link /*1*/[|B|]} */
////    A,
////    [|/*2*/B|]
////}

goTo.marker("1");
verify.goToDefinitionIs("2");
