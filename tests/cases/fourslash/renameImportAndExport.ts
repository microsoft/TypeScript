/// <reference path='fourslash.ts' />

////import [|a|] from "module";
////export { [|a|] };

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}
