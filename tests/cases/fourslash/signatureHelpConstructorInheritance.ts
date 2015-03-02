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


goTo.marker('indirectSuperCall');
verify.signatureHelpCountIs(2);
verify.currentSignatureParameterCountIs(1);
verify.currentSignatureHelpIs('B2(n: number): B2');
verify.currentParameterHelpArgumentNameIs("n");
verify.currentParameterSpanIs("n: number");
