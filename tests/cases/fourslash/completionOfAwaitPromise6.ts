/// <reference path='fourslash.ts'/>

//// async function foo(x: Promise<string>) {
////    [|x./**/|]
//// }

const replacementSpan = test.ranges()[0]
verify.completions({
    marker: "",
    exact: [
        "catch",
        "then",
    ],
    preferences: {
        includeInsertTextCompletions: false,
    },
});
