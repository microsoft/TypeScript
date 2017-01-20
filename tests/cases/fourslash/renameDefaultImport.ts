/// <reference path='fourslash.ts' />

// @Filename: B.ts
////export default class [|B|] {
////    test() {
////    }
////}

// @Filename: A.ts
////import [|B|] from "./B";
////let b = new [|B|]();
////b.test();

verify.rangesAreRenameLocations();
