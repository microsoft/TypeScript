/// <reference path='fourslash.ts' />


////inter/*invalid1*/face IFoo {
////    new(): IFoo;
////    [indexer: string]: number;
////    method(value: number): string;
////    property: string;
/////*invalid2*/}
////
////class bar imple/*invalid4*/ments IFoo {
////    constructor(   /*invalid5*/  ) {
////
////    }
////
////    pu/*invalid6*/blic method(value: string): string {
////        retu/*invalid7*/rn null;
////    }
////
////    public property: string  /*invalid8*/= "string";
////
////    public ge/*invalid9*/t value() {
////        return 0;
////    }
////}
////
////
////mod/*invalid10*/ule m1 {
////    va/*invalid11*/r varibale = 0;
////
////    function foo(arg1: number) {
////        ret/*invalid13*/urn string;
////    }
////
////    class foo {
////
////    }
////
////    var object = {
////        value1: "string",
////        value2: {
////            value21: number
////        /*invalid14*/}
////    };
////}

goTo.eachMarker(() => verify.not.quickInfoExists());

