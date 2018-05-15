/// <reference path='fourslash.ts' />

//// function f(templateStrings: TemplateStringsArray, p1_o1: string): number;
//// function f(templateStrings: TemplateStringsArray, p1_o2: number, p2_o2: number, p3_o2: number): string;
//// function f(templateStrings: TemplateStringsArray, p1_o3: string, p2_o3: boolean, p3_o3: number): boolean;
//// function f(...foo[]: any) { return ""; }
////
//// f `${ }   ${/*1*/ fa/*2*/lse /*3*/}

verify.signatureHelp({
    marker: test.markerNames(),
    overloadsCount: 3,
    text: "f(templateStrings: TemplateStringsArray, p1_o3: string, p2_o3: boolean, p3_o3: number): boolean",
    argumentCount: 3,
    parameterCount: 4,
    parameterName: "p2_o3",
    parameterSpan: "p2_o3: boolean",
});
