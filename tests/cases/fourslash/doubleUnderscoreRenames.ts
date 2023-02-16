/// <reference path='fourslash.ts'/>

// @Filename: fileA.ts
//// [|export function [|{| "contextRangeIndex": 0 |}__foo|]() {
//// }|]
////
// @Filename: fileB.ts
//// [|import { [|{| "contextRangeIndex": 2 |}__foo|] as bar } from "./fileA";|]
////
//// bar();

verify.baselineRenameAtRangesWithText("__foo");
