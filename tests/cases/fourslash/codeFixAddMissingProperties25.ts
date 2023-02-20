/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @filename: /a.js
/////**
//// * @type {{ f: (x: string) => number }}
//// */
////[|export const foo = {}|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`export const foo = {
    f: function(x) {
        throw new Error("Function not implemented.");
    }
}`,
});
