/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export {};
////const a = 1 d;

// Only give suggestions for nodes that do NOT have parse errors
verify.getSuggestionDiagnostics([{
    message: "Variable 'd' implicitly has an 'any' type.",
    code: 7005,
    range: {
        fileName: "/a.ts",
        pos: 23,
        end: 24,
    }
}]);
