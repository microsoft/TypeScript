/// <reference path='fourslash.ts' />

////interface I {
////    m(n: number, s: string): void;
////    m2: () => void;
////}
////declare function takesObj(i: I): void;
////takesObj({ m: (/*takesObj0*/) });
////takesObj({ m(/*takesObj1*/) });
////takesObj({ m: function(/*takesObj2*/) });
////takesObj({ m2: (/*takesObj3*/) });
////
////declare function takesCb(cb: (n: number, s: string, b: boolean) => void): void;
////takesCb((/*contextualParameter1*/));
////takesCb((/*contextualParameter1b*/) => {});
////takesCb((n, /*contextualParameter2*/));
////takesCb((n, s, /*contextualParameter3*/));
////takesCb((n,/*contextualParameter3_2*/ s, b));
////takesCb((n, s, b, /*contextualParameter4*/));
////
////type Cb = () => void;
////const cb: Cb = (/*contextualTypeAlias*/)
////
////const cb2: () => void = (/*contextualFunctionType*/)

verify.signatureHelp(
    {
        marker: ["takesObj0", "takesObj1", "takesObj2"],
        text: "m(n: number, s: string): void",
        parameterCount: 2,
        parameterName: "n",
        parameterSpan: "n: number",
    },
    {
        marker: "takesObj3",
        text: "m2(): void",
        parameterCount: 0,
    },
    {
        marker: ["contextualParameter1", "contextualParameter1b"],
        text: "cb(n: number, s: string, b: boolean): void",
        parameterCount: 3,
        parameterName: "n",
        parameterSpan: "n: number",
    },
    {
        marker: "contextualParameter2",
        text: "cb(n: number, s: string, b: boolean): void",
        parameterCount: 3,
        parameterName: "s",
        parameterSpan: "s: string",
    },
    {
        marker: "contextualParameter3",
        text: "cb(n: number, s: string, b: boolean): void",
        parameterCount: 3,
        parameterName: "b",
        parameterSpan: "b: boolean",
    },
    {
        marker: "contextualParameter3_2",
        text: "cb(n: number, s: string, b: boolean): void",
        parameterCount: 3,
        parameterName: "s",
        parameterSpan: "s: string",
    },
    {
        marker: "contextualParameter4",
        text: "cb(n: number, s: string, b: boolean): void",
        parameterCount: 3,
    },
    {
        marker: "contextualTypeAlias",
        text: "Cb(): void",
        parameterCount: 0,
    },
    {
        marker: "contextualFunctionType",
        text: "cb2(): void",
        parameterCount: 0,
    },
);
