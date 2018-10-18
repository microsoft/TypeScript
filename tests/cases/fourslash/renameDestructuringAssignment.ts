/// <reference path='fourslash.ts' />

////interface I {
////    [|x|]: number;
////}
////var a: I;
////var x;
////({ [|x|]: x } = a);

verify.rangesAreRenameLocations();
