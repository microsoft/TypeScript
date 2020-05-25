/// <reference path='fourslash.ts' />

////export function complex(item: string, another: string, ...rest: [] | [settings: object, errorHandler: (err: Error) => void] | [errorHandler: (err: Error) => void, ...mixins: object[]]) {
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
        text: "complex(item: string, another: string, settings: object, errorHandler: (err: Error) => void): void",
        overloadsCount: 3,
        parameterCount: 4,
        parameterName: "settings",
        parameterSpan: "settings: object",
        isVariadic: false,
    },
    {
        marker: "3",
        text: "complex(item: string, another: string, errorHandler: (err: Error) => void, ...mixins: object[]): void",
        overloadsCount: 3,
        isVariadic: true,
    },
);
