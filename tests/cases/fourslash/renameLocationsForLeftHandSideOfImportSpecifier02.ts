/// <reference path='fourslash.ts'/>

// @Filename: fileA.ts
////export function [|__foo|]() {
////}

// @Filename: fileB.ts
////import { [|__foo|] as bar } from "./fileA";
////
////bar();

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);

    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}