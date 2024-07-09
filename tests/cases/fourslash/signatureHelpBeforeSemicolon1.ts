/// <reference path='fourslash.ts' />

////function Foo(arg1: string, arg2: string) {
////}
////
////Foo(/**/;

verify.signatureHelp({
    marker: "",
    text: "Foo(arg1: string, arg2: string): void",
    parameterCount: 2,
    parameterName: "arg1",
    parameterSpan: "arg1: string",
});
