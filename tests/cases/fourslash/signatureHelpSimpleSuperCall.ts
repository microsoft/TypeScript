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

verify.signatureHelp({
    marker: "superCall",
    text: "SuperCallBase(b: boolean): SuperCallBase",
    parameterName: "b",
    parameterSpan: "b: boolean",
});
