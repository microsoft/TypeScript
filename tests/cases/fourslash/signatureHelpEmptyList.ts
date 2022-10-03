/// <reference path='fourslash.ts' />

////function Foo(arg1: string, arg2: string) {
////}
////
////Foo(/*1*/);
////function Bar<T>(arg1: string, arg2: string) { }
////Bar</*2*/>();

verify.signatureHelp(
    {
        marker: "1",
        text: "Foo(arg1: string, arg2: string): void",
        parameterCount: 2,
        parameterName: "arg1",
        parameterSpan: "arg1: string",
    },
    { marker: "2", text: "Bar<T>(arg1: string, arg2: string): void" },
);
