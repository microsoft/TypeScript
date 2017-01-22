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

verify.rangesAreRenameLocations();
