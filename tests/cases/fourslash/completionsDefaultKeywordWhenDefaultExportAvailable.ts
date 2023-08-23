/// <reference path="fourslash.ts" />

// https://github.com/microsoft/TypeScript/issues/3229

// @filename: index.ts

//// export default function () {}
//// def/*1*/

verify.completions(
    { 
        marker: "1", 
        includes: [{ name: "default", kind: "keyword", sortText: completion.SortText.GlobalsOrKeywords }],
    },
);

