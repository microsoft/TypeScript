/// <reference path='fourslash.ts' />

////var o = {
////    [|prop|]: 0
////};
////
////o = {
////    "[|prop|]": 1
////};
////
////o["[|prop|]"];
////o['[|prop|]'];
////o.[|prop|];

verify.rangesAreRenameLocations();
