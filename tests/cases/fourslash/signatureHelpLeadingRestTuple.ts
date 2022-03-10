/// <reference path='fourslash.ts' />

////export function leading(...args: [...names: string[], allCaps: boolean]): void {
////}
////
////leading(/*1*/);
////leading("ok", /*2*/);
////leading("ok", "ok", /*3*/);

verify.signatureHelp(
    {
        marker: "1",
        text: "leading(...names: string[], allCaps: boolean): void",
        overloadsCount: 1,
        parameterCount: 2,
        isVariadic: true,
    },
    {
        marker: "2",
        text: "leading(...names: string[], allCaps: boolean): void",
        overloadsCount: 1,
        parameterCount: 2,
        isVariadic: true,
    },
    {
        marker: "3",
        text: "leading(...names: string[], allCaps: boolean): void",
        overloadsCount: 1,
        parameterCount: 2,
        isVariadic: true,
    },
);
