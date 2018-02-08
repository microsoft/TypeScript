/// <reference path='fourslash.ts' />

////declare const x: { "foo ": "space in the name", };
////x[|.fo/*0*/|];
////x[|./*1*/|]
////unrelatedIdentifier;

const [r0, r1] = test.ranges();
verify.completionsAt("0", [{ name: "foo ", insertText: '["foo "]', replacementSpan: r0 }], { includeInsertTextCompletions: true });
verify.completionsAt("1", [{ name: "foo ", insertText: '["foo "]', replacementSpan: r1 }], { includeInsertTextCompletions: true });
