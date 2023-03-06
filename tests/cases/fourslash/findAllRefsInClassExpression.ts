/// <reference path='fourslash.ts'/>

////interface I { /*0*/boom(): void; }
////new class C implements I {
////   /*1*/boom(){}
////}

verify.baselineFindAllReferences('0', '1')
