/// <reference path='fourslash.ts' />

////function functionOverload();
////function functionOverload(test: string);
////function functionOverload(test?: string) { }
////functionOverload(/*functionOverload1*/);
////functionOverload(""/*functionOverload2*/);

verify.signatureHelp(
    {
        marker: "functionOverload1",
        overloadsCount: 2,
        text: "functionOverload(): any",
        parameterCount: 0,
    },
    {
        marker: "functionOverload2",
        overloadsCount: 2,
        text: "functionOverload(test: string): any",
        parameterName: "test",
        parameterSpan: "test: string",
    },
);
