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

let ranges = test.ranges()
for (let range of ranges) {
    goTo.file(range.fileName);
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}
