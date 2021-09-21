/// <reference path='fourslash.ts' />

////interface I<T> {
////    /*0*/x: boolean;
////}
////declare const i: I<number>;
////const { /*1*/x } = i;

verify.baselineFindAllReferences('0', '1')
