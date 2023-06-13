/// <reference path='fourslash.ts'/>

//// class Gre/*1*/eter {
////     someFunction() { th/*2*/is;  }
//// }
////
//// type Options = "opt/*3*/ion 1" | "option 2";
//// let myOption: Options = "option 1";
////
//// some/*4*/Label:
//// break someLabel;

verify.baselineFindAllReferences("1", "2", "3", "4");