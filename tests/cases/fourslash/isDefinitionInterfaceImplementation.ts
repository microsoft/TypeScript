/// <reference path='fourslash.ts'/>

////interface I {
////    /*1*/M(): void;
////}
////
////class C implements I {
////    /*2*/M() { }
////}
////
////({} as I).M();
////({} as C).M();

verify.baselineFindAllReferences('1', '2');
