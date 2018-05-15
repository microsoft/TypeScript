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
    text: "find<T>(l: T[], x: T): T",
    docComment: "Find an item",
    tags: [
        // TODO: GH#24130
        { name: "template", text: "T\n " },
        { name: "param", text: "l" },
        { name: "param", text: "x" },
        { name: "returns", text: "The names of the found item(s)." },
    ],
});
