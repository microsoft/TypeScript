/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export {};
////const a = 1 d;

// Only give suggestions for nodes that do NOT have parse errors
verify.getSuggestionDiagnostics([{
    message: "Variable 'd' implicitly has an 'any' type, but a better type may be inferred from usage.",
    code: 7043,
    range: {
        fileName: "/a.ts",
        pos: 23,
        end: 24,
    }
}]);
