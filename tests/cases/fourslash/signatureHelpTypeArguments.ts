/// <reference path="fourslash.ts"/>

////declare function f(a: number, b: string, c: boolean): void; // ignored, not generic
////declare function f<T extends number>(): void;
////declare function f<T, U>(): void;
////declare function f<T, U, V extends string>(): void;
////f</*f0*/;
////f<number, /*f1*/;
////f<number, string, /*f2*/;
////
////declare const C: {
////    new<T extends number>(): void;
////    new<T, U>(): void;
////    new<T, U, V extends string>(): void;
////};
////new C</*C0*/;
////new C<number, /*C1*/;
////new C<number, string, /*C2*/;

verify.signatureHelp(
    {
        marker: "f0",
        overloadsCount: 3,
        text: "f<T extends number>(): void",
        parameterName: "T",
        parameterSpan: "T extends number",
    },
    {
        marker: "f1",
        overloadsCount: 2,
        text: "f<T, U>(): void",
        parameterName: "U",
        parameterSpan: "U",
    },
    {
        marker: "f2",
        text: "f<T, U, V extends string>(): void",
        parameterName: "V",
        parameterSpan: "V extends string",
    },

    {
        marker: "C0",
        overloadsCount: 3,
        text: "C<T extends number>(): void",
        parameterName: "T",
        parameterSpan: "T extends number",
    },
    {
        marker: "C1",
        overloadsCount: 2,
        text: "C<T, U>(): void",
        parameterName: "U",
        parameterSpan: "U",
    },
    {
        marker: "C2",
        text: "C<T, U, V extends string>(): void",
        parameterName: "V",
        parameterSpan: "V extends string",
    },
);
