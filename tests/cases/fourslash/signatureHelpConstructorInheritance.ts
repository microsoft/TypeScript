/// <reference path='fourslash.ts' />

////class base {
////    constructor(s: string);
////    constructor(n: number);
////    constructor(a: any) { }
////}
////class B1 extends base { }
////class B2 extends B1 { }
////class B3 extends B2 {
////    constructor() {
////        super(/*indirectSuperCall*/3);
////    }
////}

verify.signatureHelp({
    marker: "indirectSuperCall",
    overloadsCount: 2,
    text: "B2(n: number): B2",
    parameterCount: 1,
    parameterName: "n",
    parameterSpan: "n: number",
});
