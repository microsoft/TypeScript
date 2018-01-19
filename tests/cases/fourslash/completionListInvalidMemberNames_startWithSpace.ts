/// <reference path='fourslash.ts' />

////declare const x: { " foo": 0, "foo ": 1 };
////x[|./**/|];

const replacementSpan = test.ranges()[0];
// No completion for " foo" because it starts with a space. See https://github.com/Microsoft/TypeScript/pull/20547
verify.completionsAt("", [{ name: "foo ", insertText: '["foo "]', replacementSpan }], { includeInsertTextCompletions: true });
