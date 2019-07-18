/// <reference path='fourslash.ts'/>

//// class Foo<T> { }
//// function test() {
////     new Foo<str/*1*/
//// }

verify.completions(
    {
        marker: ["1"],
        includes: [
            { name: "string", sortText: completion.SortText.GlobalsOrKeywords },
            { name: "String", sortText: completion.SortText.GlobalsOrKeywords },
        ],
    }
);
