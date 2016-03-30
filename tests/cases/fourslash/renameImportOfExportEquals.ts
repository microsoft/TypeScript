/// <reference path='fourslash.ts' />

////declare namespace N {
////    export var x: number;
////}
////declare module "mod" {
////    export = N;
////}
////declare module "test" {
////    import * as [|N|] from "mod";
////    export { [|N|] }; // Renaming N here would rename
////}

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}
