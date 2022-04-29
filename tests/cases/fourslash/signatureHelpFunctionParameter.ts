/// <reference path='fourslash.ts' />

////function parameterFunction(callback: (a: number, b: string) => void) {
////    callback(/*parameterFunction1*/5, /*parameterFunction2*/"");
////}

verify.signatureHelp(
    {
        marker: "parameterFunction1",
        text: "callback(a: number, b: string): void",
        parameterCount: 2,
        parameterName: "a",
        parameterSpan: "a: number",
    },
    {
        marker: "parameterFunction2",
        text: "callback(a: number, b: string): void",
        parameterName: "b",
        parameterSpan: "b: string",
    },
);
