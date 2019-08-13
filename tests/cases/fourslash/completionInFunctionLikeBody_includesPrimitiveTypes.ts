/// <reference path='fourslash.ts'/>

//// class Foo<T> { }
//// class Bar { }
//// function includesTypes() {
////     new Foo</*1*/
//// }
//// function excludesTypes1() {
////     new Bar</*2*/
//// }
//// function excludesTypes2() {
////     1</*3*/
//// }

verify.completions(
    {
        marker: ["1"],
        includes: [
            { name: "string", sortText: completion.SortText.GlobalsOrKeywords },
            { name: "String", sortText: completion.SortText.GlobalsOrKeywords },
        ],
    },
    {
        marker: ["2", "3"],
        excludes: ["string"]
    }
);
