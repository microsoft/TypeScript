/// <reference path="fourslash.ts" />

////function foo() {
////    using/*1*/
////}
////async function bar() {
////    await using/*2*/
////}
////
////class C {
////    foo() {
////        using/*3*/
////    }
////
////    async bar() {
////        await using/*4*/
////    }
////}

verify.completions({
    marker: ["1", "2", "3", "4"],
    includes: [{ name: 'using', sortText: completion.SortText.GlobalsOrKeywords }],
});
