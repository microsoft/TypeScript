/// <reference path='fourslash.ts' />

// @allowUnreachableCode: true

////if (false) [|0;|]

// Suggestions are returned, but turned into greyed-out text by the editor.
verify.getSuggestionDiagnostics(test.ranges().map((range): FourSlashInterface.Diagnostic => ({
    message: "Unreachable code detected.",
    code: 7027,
    reportsUnnecessary: true,
    range,
})));
