/// <reference path='fourslash.ts' />
/////*1*/interface /*2*/Numbers {
////    p: number;
////}
/////*3*/interface /*4*/Numbers {
////    m: number;
////}
/////*5*/class /*6*/Numbers {
////    f(n: number) {
////        return this.p + this.m + n;
////    }
////}
////let i: /*7*/Numbers = new /*8*/Numbers();
////let x = i.f(i.p + i.m);

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7', '8');
