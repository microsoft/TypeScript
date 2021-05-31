/// <reference path='fourslash.ts'/>

////type Options = "Option 1" | "Option 2" | "Option 3";
////var x: Options = "[|/*1*/Option 3|]";
////
////function f(a: Options) { };
////f("/*2*/

verify.completions(
    { marker: "1", exact: [
        { name: "Option 1", replacementSpan: test.ranges()[0] },
        { name: "Option 2", replacementSpan: test.ranges()[0] },
        { name: "Option 3", replacementSpan: test.ranges()[0] }
    ] },
    { marker: "2", exact: [
        { name: "Option 1", replacementSpan: test.ranges()[1] },
        { name: "Option 2", replacementSpan: test.ranges()[1] },
        { name: "Option 3", replacementSpan: test.ranges()[1] }
    ] }
);
