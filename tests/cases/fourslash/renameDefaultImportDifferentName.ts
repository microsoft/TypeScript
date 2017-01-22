/// <reference path='fourslash.ts' />

// @Filename: B.ts
////export default class /*1*/C {
////    test() {
////    }
////}

// @Filename: A.ts
////import [|B|] from "./B";
////let b = new [|B|]();
////b.test();

goTo.marker("1");
verify.occurrencesAtPositionCount(1);

verify.rangesAreRenameLocations();
