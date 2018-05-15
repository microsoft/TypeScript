/// <reference path="fourslash.ts"/>

////declare function f(a: number, b: string, c: boolean): void; // ignored, not generic
////declare function f<T extends number>(): void;
////declare function f<T, U>(): void;
////declare function f<T, U, V extends string>(): void;
////f</*0*/;
////f<number, /*1*/;
////f<number, string, /*2*/;

verify.signatureHelp(
    {
        marker: "0",
        overloadsCount: 3,
        text: "f<T extends number>(): void",
        parameterName: "T",
        parameterSpan: "T extends number",
    },
    {
        marker: "1",
        overloadsCount: 2,
        text: "f<T, U>(): void",
        parameterName: "U",
        parameterSpan: "U",
    },
    {
        marker: "2",
        text: "f<T, U, V extends string>(): void",
        parameterName: "V",
        parameterSpan: "V extends string",
    },
);
