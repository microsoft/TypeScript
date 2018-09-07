/// <reference path='fourslash.ts' />

//// function f(templateStrings: string[], p1_o1: string): number;
//// function f(templateStrings: string[], p1_o2: number, p2_o2: number, p3_o2: number): string;
//// function f(templateStrings: string[], p1_o3: string, p2_o3: boolean, p3_o3: number): boolean;
//// function f(...foo[]: any) { return ""; }
////
//// f `${ undefined }   ${ undefined }    ${/*1*/   10/*2*/./*3*/01 /*4*/} `

verify.signatureHelp({
    marker: test.markerNames(),
    overloadsCount: 3,
    text: "f(templateStrings: string[], p1_o2: number, p2_o2: number, p3_o2: number): string",
    argumentCount: 4,
    parameterCount: 4,
    parameterName: "p3_o2",
    parameterSpan: "p3_o2: number",
});
