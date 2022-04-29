/// <reference path='fourslash.ts' />

////class ConstructorCall {
////    constructor(str: string, num: number) {
////    }
////}
////var x = new ConstructorCall(/*constructorCall1*/1,/*constructorCall2*/2);

verify.signatureHelp(
    {
        marker: "constructorCall1",
        text: "ConstructorCall(str: string, num: number): ConstructorCall",
        parameterName: "str",
        parameterSpan: "str: string",
    },
    {
        marker: "constructorCall2",
        text: "ConstructorCall(str: string, num: number): ConstructorCall",
        parameterName: "num",
        parameterSpan: "num: number",
    },
);
