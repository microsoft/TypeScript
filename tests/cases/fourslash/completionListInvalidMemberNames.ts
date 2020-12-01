/// <reference path='fourslash.ts' />

////var x = {
////    "foo ": "space in the name",
////    "bar": "valid identifier name",
////    "break": "valid identifier name (matches a keyword)",
////    "any": "valid identifier name (matches a typescript keyword)",
////    "#": "invalid identifier name",
////    "$": "valid identifier name",
////    "\u0062": "valid unicode identifier name (b)",
////    "\u0031\u0062": "invalid unicode identifier name (1b)"
////};
////
////x[|./*a*/|];
////x["[|/*b*/|]"];

const replacementSpan = test.ranges()[0];
const replacementSpan1 = test.ranges()[1];
verify.completions(
    { marker: "b", exact: [
        { name: "foo ", replacementSpan: replacementSpan1 },
        { name: "bar", replacementSpan: replacementSpan1 },
        { name: "break", replacementSpan: replacementSpan1 },
        { name: "any", replacementSpan: replacementSpan1 },
        { name: "#", replacementSpan: replacementSpan1 },
        { name: "$", replacementSpan: replacementSpan1 },
        { name: "b", replacementSpan: replacementSpan1 },
        { name: "1b", replacementSpan: replacementSpan1 },
    ] },
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
