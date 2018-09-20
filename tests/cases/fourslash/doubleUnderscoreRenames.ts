/// <reference path='fourslash.ts'/>

// @Filename: fileA.ts
//// export function [|__foo|]() {
//// }
////
// @Filename: fileB.ts
//// import { [|__foo|] as bar } from "./fileA";
////
//// bar();

verify.rangesAreRenameLocations();
