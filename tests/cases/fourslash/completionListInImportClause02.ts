/// <reference path='fourslash.ts'/>

////declare module "M1" {
////    export var V;
////}
////
////declare module "M2" {
////    import { /**/ } from "M1"
////}

verify.completions({ marker: "", exact: [{ name: "type", sortText: completion.SortText.GlobalsOrKeywords }, "V"] });
