/// <reference path='fourslash.ts'/>

////class clsOverload { constructor(); constructor(test: string); constructor(test?: string) { } }
////var x = new clsOverload(/*1*/);
////var y = new clsOverload(/*2*/'');

verify.signatureHelp(
    {
        marker: "1",
        overloadsCount: 2,
        text: "clsOverload(): clsOverload",
        parameterCount: 0,
    },
    {
        marker: "2",
        overloadsCount: 2,
        text: "clsOverload(test: string): clsOverload",
        parameterCount: 1,
        parameterName: "test",
        parameterSpan: "test: string",
    },
);
