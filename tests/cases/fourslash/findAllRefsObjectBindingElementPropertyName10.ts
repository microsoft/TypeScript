/// <reference path='fourslash.ts'/>

////interface Recursive {
////    /*1*/next?: Recursive;
////    value: any;
////}
////
////function f (/*2*/{ /*3*/next: { /*4*/next: x} }: Recursive) {
////}

verify.baselineFindAllReferences('1', '2', '3', '4');
