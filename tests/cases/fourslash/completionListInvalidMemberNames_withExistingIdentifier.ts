/// <reference path='fourslash.ts' />

////declare const x: { "foo ": "space in the name", };
////x[|.fo/*0*/|];
////x[|./*1*/|]
////unrelatedIdentifier;

const [r0, r1] = test.ranges();
verify.completions(
    {
        marker: "0",
        exact: [{ name: "foo ", insertText: '["foo "]', replacementSpan: r0 }],
        preferences: { includeInsertTextCompletions: true },
    },
    {
        marker: "1",
        exact: [{ name: "foo ", insertText: '["foo "]', replacementSpan: r1 }],
        preferences: { includeInsertTextCompletions: true },
    },
);
