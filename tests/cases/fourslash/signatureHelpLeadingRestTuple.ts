/// <reference path='fourslash.ts' />

////export function leading(...args: [...names: string[], x: boolean, y: number]): void {
////}
////
////leading(/*1*/);
////leading("ok", /*2*/);
////leading("ok", "ok", /*3*/);

verify.signatureHelp(
    {
        marker: "1",
        text: "leading(...args: [...names: string[], x: boolean, y: number]): void",
        overloadsCount: 1,
        parameterCount: 1,
        parameterName: "args",
        parameterSpan: "...args: [...names: string[], x: boolean, y: number]",
        isVariadic: true,
    },
    {
        marker: "2",
        text: "leading(...args: [...names: string[], x: boolean, y: number]): void",
        overloadsCount: 1,
        parameterCount: 1,
        isVariadic: true,
    },
    {
        marker: "3",
        text: "leading(...args: [...names: string[], x: boolean, y: number]): void",
        overloadsCount: 1,
        parameterCount: 1,
        isVariadic: true,
    },
);
