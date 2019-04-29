/// <reference path="fourslash.ts" />

// @Filename: a.js
// @allowJs: true
////___foo; __foo;/**/

verify.completions({
    marker: "",
    includes: [
        { name: "__foo", kind: "warning" },
        { name: "___foo", kind: "warning" },
    ],
});
