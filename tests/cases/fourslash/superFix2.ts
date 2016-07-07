/// <reference path='fourslash.ts' />

////class Base{
////}
////class C extends Base{
////    private a:number;
////    constructor() {[|
////        this.a = 12;
////        super();|]
////    }
////}

verify.codeFixAtPosition("super(); this.a = 12;");