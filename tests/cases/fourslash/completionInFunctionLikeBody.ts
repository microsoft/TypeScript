/// <reference path='fourslash.ts'/>

//// class Foo {
////     bar () {
////         /*1*/
////         class Foo1 {
////             bar1 () {
////                 /*2*/
////             }
////             /*3*/
////         }
////     }
////     /*4*/
//// }

verify.completions(
    {
        marker: ["1", "2"],
        includes: "async",
        excludes: ["public", "private", "protected", "constructor", "readonly", "static", "abstract", "get", "set"],
    },
    { marker: ["3", "4"], exact: completion.classElementKeywords, isNewIdentifierLocation: true },
);
