/// <reference path='fourslash.ts' />


////inter/*invlaid1*/face IFoo {
////    new(): IFoo;
////    [indexer: string]: number;
////    method(value: number): string;
////    property: string;
/////*invlaid2*/}
////
////cl/*invlaid3*/ass bar imple/*invlaid4*/ments IFoo {
////    constructor(   /*invlaid5*/  ) {
////
////    }
////
////    pu/*invlaid6*/blic method(value: string): string {
////        retu/*invlaid7*/rn null;
////    }
////
////    public property: string  /*invlaid8*/= "string";
////
////    public ge/*invlaid9*/t value() {
////        return 0;
////    }
////}
////
////
////mod/*invlaid10*/ule m1 {
////    va/*invlaid11*/r varibale = 0;
////
////    func/*invlaid12*/tion foo(arg1: number) {
////        ret/*invlaid13*/urn string;
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
////        /*invlaid14*/}
////    };
////}

goTo.eachMarker(() => verify.not.quickInfoExists());

