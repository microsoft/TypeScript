/// <reference path='fourslash.ts'/>

////var x = function [|f|](g: any, h: any) {
////    [|f|]([|f|], g);
////}

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);

    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}