/// <reference path='fourslash.ts'/>

////function f() {
////    
////}
////var x = function [|f|](g: any, h: any) {
////
////    let helper = function f(): any { f(); }
////
////    let foo = () => [|f|]([|f|], g);
////}

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);

    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}