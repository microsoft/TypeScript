/// <reference path='fourslash.ts'/>

////const a = {
////  b: 42 as con/*0*/
////};
////
////1 as con/*1*/
////
////const b = 42 as /*2*/

verify.completions({ marker: test.markers(), includes: [{ name: "const", sortText: completion.SortText.GlobalsOrKeywords }] });
