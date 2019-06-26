/// <reference path='fourslash.ts'/>

//// async function foo(x: Promise<string>) {
////    [|x./**/|]
//// }

const replacementSpan = test.ranges()[0]
verify.completions({
    marker: "",
    includes: [
        "then",
        { name: "trim", insertText: '(await x).trim', replacementSpan },
    ],
    preferences: {
        includeInsertTextCompletions: true,
    },
});
