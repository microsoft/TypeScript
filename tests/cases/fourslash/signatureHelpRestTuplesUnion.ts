/// <reference path='fourslash.ts' />


//// export function foo(...args: [string, string] | [number, string, string]
////     ) { 
//// }
//// foo(/*1*/)

verify.signatureHelp(
    {
        marker: "1",
        text: "foo(args_0: string, args_1: string): void",
        overloadsCount: 2,
        parameterCount: 2,
        parameterName: "args_0",
        parameterSpan: "args_0: string",
        isVariadic: false,
    },
);
