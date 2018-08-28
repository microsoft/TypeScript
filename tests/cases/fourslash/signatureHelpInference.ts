/// <reference path='fourslash.ts' />

////declare function f<T extends string>(a: T, b: T, c: T): void;
////f("x", /**/);

verify.signatureHelp({
    marker: "",
    text: 'f(a: "x", b: "x", c: "x"): void',
    parameterCount: 3,
    parameterName: "b",
    parameterSpan: 'b: "x"',
});
