/// <reference path="fourslash.ts" />

////const x = { a: 1 } /*1*/
////function foo() {
////    const x = { a: 1 } /*2*/
////} /*3*/
////
////class C {} /*4*/

verify.completions({
    marker: ["1", "2", "3", "4"],
    includes: [{ name: "satisfies", sortText: completion.SortText.GlobalsOrKeywords }]
});
