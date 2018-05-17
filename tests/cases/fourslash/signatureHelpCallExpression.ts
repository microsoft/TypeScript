/// <reference path='fourslash.ts'/>

////function fnTest(str: string, num: number) { }
////fnTest(/*1*/'', /*2*/5);

verify.signatureHelp(
    {
        marker: "1",
        text: 'fnTest(str: string, num: number): void',
        parameterCount: 2,
        parameterName: "str",
        parameterSpan: "str: string",
    },
    {
        marker: "2",
        parameterName: "num",
        parameterSpan: "num: number",
    },
);
