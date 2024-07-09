/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @filename: foo.js
////const NS = {};
////NS.Foo = function () {};
////NS.Foo.prototype.m = function () {};

verify.codeFix({
    description: "Convert function to an ES2015 class",
    newFileContent:
`const NS = {};
NS.Foo = class {
    constructor() { }
    m() { }
};
`
});
