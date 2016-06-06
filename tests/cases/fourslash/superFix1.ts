/// <reference path='fourslash.ts' />

////class Base{
////}
////class C extends Base{
////    /*0*/constructor() {
////    }
////}

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "super();" });
