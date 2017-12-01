/// <reference path='fourslash.ts' />

//// function f(templateStrings: string[], p1_o1: string): number;
//// function f(templateStrings: string[], p1_o2: number, p2_o2: number, p3_o2: number): string;
//// function f(templateStrings: string[], p1_o3: string, p2_o3: boolean, p3_o3: number): boolean;
//// function f(...foo[]: any) { return ""; }
////
//// f `${/*1*/ /*2*/ /*3*/

goTo.eachMarker(() => {
    verify.signatureHelpCountIs(3);
    verify.signatureHelpArgumentCountIs(2);

    verify.currentSignatureParameterCountIs(2);
    verify.currentSignatureHelpIs('f(templateStrings: string[], p1_o1: string): number');
    verify.currentParameterHelpArgumentNameIs("p1_o1");
    verify.currentParameterSpanIs("p1_o1: string");
});