/// <reference path='fourslash.ts' />

////let x = {
////    [|f/*1*/oo|]
////}

verify.baselineGoToDefinition("1");
