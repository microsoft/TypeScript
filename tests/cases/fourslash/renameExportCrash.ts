///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// let a;
//// module.exports = /**/a;
//// exports["foo"] = a;

verify.baselineRename("", { });
