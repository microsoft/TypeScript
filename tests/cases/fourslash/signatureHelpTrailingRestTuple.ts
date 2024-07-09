/// <reference path='fourslash.ts' />

////export function leading(allCaps: boolean, ...names: string[]): void {
////}
////
////leading(/*1*/);
////leading(false, /*2*/);
////leading(false, "ok", /*3*/);

verify.signatureHelp(
    {
        marker: "1",
        text: "leading(allCaps: boolean, ...names: string[]): void",
        overloadsCount: 1,
        parameterCount: 2,
        parameterName: "allCaps",
        parameterSpan: "allCaps: boolean",
        isVariadic: true,
    },
    {
        marker: "2",
        text: "leading(allCaps: boolean, ...names: string[]): void",
        overloadsCount: 1,
        parameterCount: 2,
        parameterName: "names",
        parameterSpan: "...names: string[]",
        isVariadic: true,
    },
    {
        marker: "3",
        text: "leading(allCaps: boolean, ...names: string[]): void",
        overloadsCount: 1,
        parameterCount: 2,
        parameterName: "names",
        parameterSpan: "...names: string[]",
        isVariadic: true,
    },
);
