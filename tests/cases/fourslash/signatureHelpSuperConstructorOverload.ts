/// <reference path='fourslash.ts' />

////class SuperOverLoadBase {
////    constructor();
////    constructor(test: string);
////    constructor(test?: string) {
////    }
////}
////class SuperOverLoad1 extends SuperOverLoadBase {
////    constructor() {
////        super(/*superOverload1*/);
////    }
////}
////class SuperOverLoad2 extends SuperOverLoadBase {
////    constructor() {
////        super(""/*superOverload2*/);
////    }
////}

goTo.marker('superOverload1');
verify.signatureHelpCountIs(2);
verify.currentSignatureHelpIs("SuperOverLoadBase(): SuperOverLoadBase");
verify.currentSignatureParameterCountIs(0);
goTo.marker('superOverload2');
verify.currentSignatureParameterCountIs(1);
verify.currentSignatureHelpIs("SuperOverLoadBase(test: string): SuperOverLoadBase");
verify.currentParameterHelpArgumentNameIs("test");
verify.currentParameterSpanIs("test: string");