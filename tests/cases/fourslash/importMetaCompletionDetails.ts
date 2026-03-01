/// <reference path="fourslash.ts" />

// @filename: index.mts
// @module: Node16
// @strict: true
//// let x = import.meta/**/;

verify.completions({
    marker: "",
    includes: [
        {
            name: "meta",
            text: "(property) ImportMetaExpression.meta: ImportMeta",
        },
    ]
})
verify.noErrors();