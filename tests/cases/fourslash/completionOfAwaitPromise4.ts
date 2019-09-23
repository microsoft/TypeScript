/// <reference path='fourslash.ts'/>

//// function foo(x: Promise<string>) {
////    [|x./**/|]
//// }

const replacementSpan = test.ranges()[0]
verify.completions({
    marker: "",
    includes: ["then"],
    excludes: ["trim"],
    preferences: {
        includeInsertTextCompletions: true,
    },
});
