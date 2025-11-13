/// <reference path='fourslash.ts' />

// @allowUnusedLabels: true

////[|foo|]: while (true) {}

// Suggestions are returned, but turned into greyed-out text by the editor.
verify.getSuggestionDiagnostics(test.ranges().map((range): FourSlashInterface.Diagnostic => ({
    message: "Unused label.",
    code: 7028,
    reportsUnnecessary: true,
    range,
})));
