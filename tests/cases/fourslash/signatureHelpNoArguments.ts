/// <reference path='fourslash.ts' />


////function foo(n: number): string {
////}
////
////foo(/**/

verify.signatureHelp({
    marker: "",
    text: "foo(n: number): string",
    parameterName: "n",
    parameterSpan: "n: number",
});
