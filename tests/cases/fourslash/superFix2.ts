/// <reference path='fourslash.ts' />

////class Base{
////}
////class C extends Base{
////    private a:number;
////    /*0*/constructor() {
////        this.a = 12;
////        super();
////    }
////}

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "super();" });
