/// <reference path='fourslash.ts' />

////interface Obj {
////    [`/*1*/num`]: number;
////}
////
////let o: Obj = {
////    [`num`]: 0
////};
////
////o = {
////    ['num']: 1
////};
////
////o['num'] = 2;
////o[`num`] = 3;
////
////o['num'];
////o[`num`];

verify.baselineFindAllReferences('1')
