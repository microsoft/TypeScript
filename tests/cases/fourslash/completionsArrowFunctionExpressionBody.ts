/// <reference path='fourslash.ts' />

// Verify that statement-only keywords are excluded from completions in arrow function expression bodies,
// while expression-valid keywords remain available.

// @Filename: /a.ts
////const f1 = (x: number) => /*expr1*/x;
////const f2 = async (x: number) => /*expr2*/x;
////const f3 = (x: number) => { return /*block1*/x; };

goTo.marker("expr1");
// Statement-only keywords must not appear in expression-body completions
verify.completions({
    excludes: [
        "break",
        "case",
        "catch",
        "continue",
        "debugger",
        "default",
        "do",
        "else",
        "export",
        "finally",
        "for",
        "if",
        "return",
        "switch",
        "throw",
        "try",
        "var",
        "while",
        "with",
        "yield",
        "declare",
        "using",
        "type",
    ],
});
// Expression-valid keywords must still appear
verify.completions({
    includes: [
        { name: "new", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "typeof", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "void", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "false", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "true", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "null", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "function", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "class", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "delete", sortText: completion.SortText.GlobalsOrKeywords },
    ],
});

goTo.marker("expr2");
// async arrow function expression body: await should be available
verify.completions({
    includes: [{ name: "await", sortText: completion.SortText.GlobalsOrKeywords }],
    excludes: [
        "default",
        "return",
        "for",
        "while",
    ],
});

goTo.marker("block1");
// In a block body, statement keywords ARE valid completions
verify.completions({
    includes: [
        { name: "return", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "for", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "if", sortText: completion.SortText.GlobalsOrKeywords },
    ],
});
