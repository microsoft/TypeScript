/// <reference path='fourslash.ts' />

////declare const x: { "\"'": 0 };
////x[|./**/|];

const replacementSpan = test.ranges()[0];
verify.completions({
    marker: "",
    exact: { name: `"'`, insertText: `["\\"'"]`, replacementSpan },
    preferences: { includeInsertTextCompletions: true },
});

verify.completions({
    marker: "",
    exact: { name: `"'`, insertText: `['"\\'']`, replacementSpan },
    preferences: {
        includeInsertTextCompletions: true,
        quotePreference: "single",
    },
});
