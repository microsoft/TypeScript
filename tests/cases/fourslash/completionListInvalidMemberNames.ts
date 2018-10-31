/// <reference path='fourslash.ts' />

////var x = {
////    "foo ": "space in the name",
////    "bar": "valid identifier name",
////    "break": "valid identifier name (matches a keyword)",
////    "any": "valid identifier name (matches a typescript keyword)",
////    "#": "invalid identifier name",
////    "$": "valid identifier name",
////    "\u0062": "valid unicode identifer name (b)",
////    "\u0031\u0062": "invalid unicode identifer name (1b)"
////};
////
////x[|./*a*/|];
////x["/*b*/"];

const replacementSpan = test.ranges()[0];
verify.completions(
    { marker: "b", exact: ["foo ", "bar", "break", "any", "#", "$", "b", "1b"] },
    {
        marker: "a",
        exact: [
            { name: "foo ", insertText: '["foo "]', replacementSpan },
            "bar",
            "break",
            "any",
            { name: "#", insertText: '["#"]', replacementSpan },
            "$",
            "b",
            { name: "1b", insertText: '["1b"]', replacementSpan },
        ],
        preferences: { includeInsertTextCompletions: true },
    },
);
