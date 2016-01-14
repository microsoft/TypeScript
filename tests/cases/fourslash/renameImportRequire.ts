/// <reference path='fourslash.ts' />

////import [|e|] = require("mod4");
////[|e|];
////a = { [|e|] };
////export { [|e|] };

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}
