/// <reference path='fourslash.ts' />

////declare const x: { "foo ": "space in the name", };
////x[|.fo/**/|];

const replacementSpan = test.ranges()[0];
verify.completionsAt("", [{ name: "foo ", insertText: '["foo "]', replacementSpan }], { includeInsertTextCompletions: true });
