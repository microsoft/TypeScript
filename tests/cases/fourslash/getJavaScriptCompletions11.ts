///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @type {number|string} */
////var v;
////v./**/

verify.completions({
    marker: "",
    includes: [
        { name: "toExponential", kind: "method" },
        { name: "charCodeAt", kind: "method" },
    ],
});
