/// <reference path='fourslash.ts' />

////declare const x: { "\"'": 0 };
////x[|./**/|];

const replacementSpan = test.ranges()[0];
verify.completionsAt("", [{ name: `"'`, insertText: `["\\"'"]`, replacementSpan }], { includeInsertTextCompletions: true });

verify.completionsAt("", [{ name: `"'`, insertText: `['"\\'']`, replacementSpan }], {
    includeInsertTextCompletions: true,
    quotePreference: "single",
});
