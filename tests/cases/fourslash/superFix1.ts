/// <reference path='fourslash.ts' />

////class Base{
////}
////class C extends Base{
////    constructor() {/*0*/
////    }
////}

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "super();" });
