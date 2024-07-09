/// <reference path='fourslash.ts' />

////var anonymousFunctionTest = function(n: number, s: string): (a: number, b: string) => string {
////    return null;
////}
////anonymousFunctionTest(5, "")(/*anonymousFunction1*/1, /*anonymousFunction2*/"");

verify.signatureHelp(
    {
        marker: "anonymousFunction1",
        text: '(a: number, b: string): string',
        parameterCount: 2,
        parameterName: "a",
        parameterSpan: "a: number",
    },
    {
        marker: "anonymousFunction2",
        parameterName: "b",
        parameterSpan: "b: string",
    },
);
