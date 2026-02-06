/// <reference path='fourslash.ts' />

////export function complex(item: string, another: string, ...rest: [] | [object, (err: Error) => void] | [(err: Error) => void, ...object[]]) {
////    
////}
////
////complex(/*1*/);
////complex("ok", "ok", /*2*/);
////complex("ok", "ok", e => void e, {}, /*3*/);

verify.signatureHelp(
    {
        marker: "1",
        text: "complex(item: string, another: string): void",
        overloadsCount: 3,
        parameterCount: 2,
        parameterName: "item",
        parameterSpan: "item: string",
        isVariadic: false,
    },
    {
        marker: "2",
        text: "complex(item: string, another: string, rest_0: object, rest_1: (err: Error) => void): void",
        overloadsCount: 3,
        parameterCount: 4,
        parameterName: "rest_0",
        parameterSpan: "rest_0: object",
        isVariadic: false,
    },
    {
        marker: "3",
        text: "complex(item: string, another: string, rest_0: (err: Error) => void, ...rest: object[]): void",
        overloadsCount: 3,
        isVariadic: true,
    },
);
