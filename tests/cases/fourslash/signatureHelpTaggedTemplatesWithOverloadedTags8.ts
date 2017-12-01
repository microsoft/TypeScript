/// <reference path='fourslash.ts' />

//// function f(templateStrings: string[], p1_o1: string): number;
//// function f(templateStrings: string[], p1_o2: number, p2_o2: number, p3_o2: number): string;
//// function f(templateStrings: string[], p1_o3: string, p2_o3: boolean, p3_o3: number): boolean;
//// function f(...foo[]: any) { return ""; }
////
//// f `${ undefined }   ${ undefined }    ${/*1*/   10/*2*/./*3*/01 /*4*/} `

goTo.eachMarker(() => {
    verify.signatureHelpCountIs(3);
    verify.signatureHelpArgumentCountIs(4);

    verify.currentSignatureParameterCountIs(4);
    verify.currentSignatureHelpIs('f(templateStrings: string[], p1_o2: number, p2_o2: number, p3_o2: number): string');
    verify.currentParameterHelpArgumentNameIs("p3_o2");
    verify.currentParameterSpanIs("p3_o2: number");
});