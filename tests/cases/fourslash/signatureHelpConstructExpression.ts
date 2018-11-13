/// <reference path='fourslash.ts'/>

////class sampleCls { constructor(str: string, num: number) { } }
////var x = new sampleCls(/*1*/"", /*2*/5);

verify.signatureHelp(
    {
        marker: "1",
        text: "sampleCls(str: string, num: number): sampleCls",
        parameterCount: 2,
        parameterName: "str",
        parameterSpan: "str: string",
    },
    {
        marker: "2",
        parameterName: "num",
        parameterSpan: "num: number",
    },
)
