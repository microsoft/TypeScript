/// <reference path="fourslash.ts" />

////declare const x: [number, number];
////x[|./**/|];

const replacementSpan = test.ranges()[0];
verify.completions({
    marker: "",
    includes: [
        { name: "0", insertText: '[0]', replacementSpan },
        { name: "1", insertText: '[1]', replacementSpan },
        "length",
    ],
    excludes: "2",
    preferences: {
        includeInsertTextCompletions: true,
    },
});
