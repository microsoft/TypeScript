/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function f(new C(100, 3, undefined)

verify.codeFix({
    description: "Prefix 'C' with an underscore",
    index: 1,
    newFileContent: "function f(new _C(100, 3, undefined)",
});
