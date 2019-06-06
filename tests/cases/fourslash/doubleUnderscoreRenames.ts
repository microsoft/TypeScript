/// <reference path='fourslash.ts'/>

// @Filename: fileA.ts
//// [|export function [|{| "declarationRangeIndex": 0 |}__foo|]() {
//// }|]
////
// @Filename: fileB.ts
//// [|import { [|{| "declarationRangeIndex": 2 |}__foo|] as bar } from "./fileA";|]
////
//// bar();

verify.rangesWithSameTextAreRenameLocations("__foo");
