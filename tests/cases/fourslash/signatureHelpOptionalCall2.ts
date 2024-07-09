/// <reference path='fourslash.ts'/>

////declare const fnTest: undefined | ((str: string, num: number) => void);
////fnTest?.(/*1*/);

verify.signatureHelp(
    {
        marker: "1",
        text: 'fnTest(str: string, num: number): void',
        parameterCount: 2,
        parameterName: "str",
        parameterSpan: "str: string",
    },
);
