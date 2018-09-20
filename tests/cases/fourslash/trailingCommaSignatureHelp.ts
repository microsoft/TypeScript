/// <reference path="fourslash.ts" />

////function str(n: number): string;
/////**
//// * Stringifies a number with radix
//// * @param radix The radix
//// */
////function str(n: number, radix: number): string;
////function str(n: number, radix?: number): string { return ""; }
////
////str(1, /*a*/)
////
////declare function f<T>(a: T): T;
////f(2, /*b*/);

verify.signatureHelp(
    {
        marker: "a",
        text: "str(n: number, radix: number): string",
        parameterName: "radix",
        parameterDocComment: "The radix",
        docComment: "Stringifies a number with radix",
        tags: [{ name: "param", text: "radix The radix" }],
        overloadsCount: 2,
    },
    {
        marker: "b",
        text: "f(a: 2): 2",
    },
);
