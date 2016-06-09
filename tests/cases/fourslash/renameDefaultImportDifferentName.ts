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

goTo.file("B.ts");
goTo.marker("1");
verify.occurrencesAtPositionCount(1);

goTo.file("A.ts");
let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}
