/// <reference path='fourslash.ts' />

////var objectLiteral = { n: 5, s: "", f: (a: number, b: string) => "" };
////objectLiteral.f(/*objectLiteral1*/4, /*objectLiteral2*/"");

verify.signatureHelp(
    {
        marker: "objectLiteral1",
        text: "f(a: number, b: string): string",
        parameterCount: 2,
        parameterName: "a",
        parameterSpan: "a: number",
    },
    {
        marker: "objectLiteral2",
        text: "f(a: number, b: string): string",
        parameterName: "b",
        parameterSpan: "b: string",
    },
);
