/// <reference path='fourslash.ts' />

// @noImplicitAny: false
////[|let foo;|]
////
////foo?.();
////foo = () => {}

verify.codeFix({
    description: "Infer type of 'foo' from usage",
    index: 0,
    newRangeContent: "let foo: () => void;"
});
