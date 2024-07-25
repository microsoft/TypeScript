/// <reference path='fourslash.ts'/>

////module ATest {
////    export interface Bar { }
////}
////
////function ATest() { }
////
/////*1*/import /*2*/alias = ATest; // definition
////
////var a: /*3*/alias.Bar; // namespace
/////*4*/alias.call(this); // value

verify.baselineFindAllReferences('1', '2', '3', '4');
