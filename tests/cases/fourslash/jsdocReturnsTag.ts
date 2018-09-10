///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: dummy.js
/////**
//// * Find an item
//// * @template T
//// * @param {T[]} l
//// * @param {T} x
//// * @returns {?T}  The names of the found item(s).
//// */
////function find(l, x) {
////}
////find(''/**/);

verify.signatureHelp({
    marker: "",
    text: "find(l: any[], x: any): any",
    docComment: "Find an item",
    tags: [
        { name: "template", text: "T" },
        { name: "param", text: "l" },
        { name: "param", text: "x" },
        { name: "returns", text: "The names of the found item(s)." },
    ],
});
