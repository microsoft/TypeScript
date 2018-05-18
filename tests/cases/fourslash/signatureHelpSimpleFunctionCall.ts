/// <reference path='fourslash.ts' />

////// Simple function test
////function functionCall(str: string, num: number) {
////}
////functionCall(/*functionCall1*/);
////functionCall("", /*functionCall2*/1);

verify.signatureHelp(
    {
        marker: "functionCall1",
        text: "functionCall(str: string, num: number): void",
        parameterName: "str",
        parameterSpan: "str: string",
    },
    {
        marker: "functionCall2",
        text: "functionCall(str: string, num: number): void",
        parameterName: "num",
        parameterSpan: "num: number",
    },
);
