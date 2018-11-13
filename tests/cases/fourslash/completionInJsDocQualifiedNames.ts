/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /node_modules/foo/index.d.ts
/////** tee */
////export type T = number;

// @Filename: /a.js
////import * as Foo from "foo";
/////** @type {Foo./**/} */
////const x = 0;

verify.completions({
    marker: "",
    includes: {
        name: "T",
        text: "type T = number",
        documentation: "tee",
        kind: "type",
        kindModifiers: "export,declare",
    },
});
