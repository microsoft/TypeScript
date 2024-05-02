/// <reference path='fourslash.ts'/>


//// function fnTest(str: string, num: number) { }
//// declare function wrap<A extends any[], R>(fn: (...a: A) => R) : (...a: A) => R;
//// var fnWrapped = wrap(fnTest);
//// fnWrapped/*3*/(/*1*/'', /*2*/5);
//// function fnTestVariadic (str: string, ...num: number[]) { }
//// var fnVariadicWrapped = wrap(fnTestVariadic);
//// fnVariadicWrapped/*4*/(/*5*/'', /*6*/5);
//// function fnNoParams () { }
//// var fnNoParamsWrapped = wrap(fnNoParams);
//// fnNoParamsWrapped/*7*/(/*8*/);

verify.quickInfoAt("3", "var fnWrapped: (str: string, num: number) => void");
verify.signatureHelp(
    {
        marker: "1",
        text: "fnWrapped(str: string, num: number): void",
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

verify.quickInfoAt("4", "var fnVariadicWrapped: (str: string, ...num: number[]) => void");
verify.signatureHelp(
    {
        marker: "5",
        text: "fnVariadicWrapped(str: string, ...num: number[]): void",
        parameterCount: 2,
        parameterName: "str",
        parameterSpan: "str: string",
        isVariadic: true,
    },
    {
        marker: "6",
        parameterName: "num",
        parameterSpan: "...num: number[]",
        isVariadic: true,
    },
);

verify.quickInfoAt("7", "var fnNoParamsWrapped: () => void");
verify.signatureHelp(
    {
        marker: "8",
        text: "fnNoParamsWrapped(): void",
        parameterCount: 0,
    }
);
