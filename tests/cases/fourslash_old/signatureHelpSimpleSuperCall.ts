/// <reference path='fourslash.ts' />

////class SuperCallBase {
////    constructor(b: boolean) {
////    }
////}
////class SuperCall extends SuperCallBase {
////    constructor() {
////        super(/*superCall*/);
////    }
////}

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker('superCall');
verify.signatureHelpCountIs(1);
verify.currentSignatureHelpIs("SuperCallBase(b: boolean): SuperCallBase");
verify.currentParameterHelpArgumentNameIs("b");
verify.currentParameterSpanIs("b: boolean");
