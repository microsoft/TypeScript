/// <reference path='fourslash.ts'/>

////class C {
////    public foo(x: string);
////    public foo(x: number);
////    public foo(x: any) { return x; }
////}

////interface I extends C {
////    other(x: any): any;
////}

////var i: I;
////i.foo(/**/

verify.signatureHelp({
    marker: "",
    overloadsCount: 2,
    parameterSpan: "x: string",
});
