/// <reference path="fourslash.ts" />

////function foo() {
////    usin/*1*/
////}
////async function bar() {
////    await usin/*2*/
////}
////
////class C {
////    foo() {
////        usin/*3*/
////    }
////
////    async bar() {
////        await usin/*4*/
////    }
////}

verify.completions({
    marker: ["1", "2", "3", "4"],
    includes: [{ name: 'using', sortText: completion.SortText.GlobalsOrKeywords }],
});
