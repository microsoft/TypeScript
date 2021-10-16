/// <reference path='fourslash.ts'/>

////declare module "M1" {
////    export var V;
////}
////var W;
////declare module "M2" {
////    export { /**/ } from "M1"
////}

verify.completions({ marker: "", exact: ["V", { name: "type", sortText: completion.SortText.GlobalsOrKeywords }] });
