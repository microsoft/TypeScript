/// <reference path='fourslash.ts'/>

////interface I {
////    /*0*/property1: number;
////    property2: string;
////}
////
////var elems: I[];
////for (let { /*1*/property1: p } of elems) {
////}
////for (let { /*2*/property1 } of elems) {
////}
////for (var { /*3*/property1: p1 } of elems) {
////}
////var p2;
////for ({ /*4*/property1 : p2 } of elems) {
////}

verify.baselineFindAllReferences('0', '1', '3', '4', '2')
