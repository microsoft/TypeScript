/// <reference path='fourslash.ts' />

////class SuperOverloadBase {
////    constructor();
////    constructor(test: string);
////    constructor(test?: string) {
////    }
////}
////class SuperOverLoad1 extends SuperOverloadBase {
////    constructor() {
////        super(/*superOverload1*/);
////    }
////}
////class SuperOverLoad2 extends SuperOverloadBase {
////    constructor() {
////        super(""/*superOverload2*/);
////    }
////}

verify.signatureHelp(
    {
        marker: "superOverload1",
        overloadsCount: 2,
        text: "SuperOverloadBase(): SuperOverloadBase",
        parameterCount: 0,
    },
    {
        marker: "superOverload2",
        overloadsCount: 2,
        text: "SuperOverloadBase(test: string): SuperOverloadBase",
        parameterCount: 1,
        parameterName: "test",
        parameterSpan: "test: string",
    },
);
