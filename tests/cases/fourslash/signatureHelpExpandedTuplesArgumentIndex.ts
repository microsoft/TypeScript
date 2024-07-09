/// <reference path='fourslash.ts' />

////function foo(...args: [string, string] | [number, string, string]
////) {
////
////}
////
////foo(123/*1*/,)
////foo(""/*2*/, ""/*3*/)
////foo(123/*4*/, ""/*5*/, )
////foo(123/*6*/, ""/*7*/, ""/*8*/)

verify.signatureHelp(
    {
        marker: "1",
        text: "foo(args_0: number, args_1: string, args_2: string): void",
        overloadsCount: 2,
        parameterCount: 3,
        parameterName: "args_0",
        parameterSpan: "args_0: number",
        isVariadic: false,
        overrideSelectedItemIndex: 1
    },
    {
        marker: "2",
        text: "foo(args_0: string, args_1: string): void",
        overloadsCount: 2,
        parameterCount: 2,
        parameterName: "args_0",
        parameterSpan: "args_0: string",
        isVariadic: false,
        overrideSelectedItemIndex: 0
    },
    {
        marker: "3",
        text: "foo(args_0: string, args_1: string): void",
        overloadsCount: 2,
        parameterCount: 2,
        parameterName: "args_1",
        parameterSpan: "args_1: string",
        isVariadic: false,
        overrideSelectedItemIndex: 0
    },
    {
        marker: "4",
        text: "foo(args_0: number, args_1: string, args_2: string): void",
        overloadsCount: 2,
        parameterCount: 3,
        parameterName: "args_0",
        parameterSpan: "args_0: number",
        isVariadic: false,
        overrideSelectedItemIndex: 1
    },
    {
        marker: "5",
        text: "foo(args_0: number, args_1: string, args_2: string): void",
        overloadsCount: 2,
        parameterCount: 3,
        parameterName: "args_1",
        parameterSpan: "args_1: string",
        isVariadic: false,
        overrideSelectedItemIndex: 1
    },
    {
        marker: "6",
        text: "foo(args_0: number, args_1: string, args_2: string): void",
        overloadsCount: 2,
        parameterCount: 3,
        parameterName: "args_0",
        parameterSpan: "args_0: number",
        isVariadic: false,
        overrideSelectedItemIndex: 1
    },
    {
        marker: "7",
        text: "foo(args_0: number, args_1: string, args_2: string): void",
        overloadsCount: 2,
        parameterCount: 3,
        parameterName: "args_1",
        parameterSpan: "args_1: string",
        isVariadic: false,
        overrideSelectedItemIndex: 1
    },
    {
        marker: "8",
        text: "foo(args_0: number, args_1: string, args_2: string): void",
        overloadsCount: 2,
        parameterCount: 3,
        parameterName: "args_2",
        parameterSpan: "args_2: string",
        isVariadic: false,
        overrideSelectedItemIndex: 1
    },
);
