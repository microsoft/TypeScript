/// <reference path='fourslash.ts'/>

// @Filename: fileA.ts
////export function [|foo|]() {
////}

// @Filename: fileB.ts
////import { [|foo|] as bar } from "./fileA";
////
////bar();

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);

    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}