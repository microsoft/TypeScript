/// <reference path="fourslash.ts" />

////declare module "M1" {
////    export var abc: number;
////    export var def: string;
////}
////
////declare module "M2" {
////    import { abc/**/ } from "M1";
////}

// Ensure we don't filter out the current item.
verify.completions({ marker: "", exact: ["abc", "def", { name: "type", sortText: completion.SortText.GlobalsOrKeywords }] });
