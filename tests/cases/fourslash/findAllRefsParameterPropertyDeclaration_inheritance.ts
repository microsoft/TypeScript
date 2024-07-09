/// <reference path='fourslash.ts'/>

////class C {
////	constructor(public /*0*/x: string) {
////		/*1*/x;
////	}
////}
////class D extends C {
////	constructor(public /*2*/x: string) {
////		super(/*3*/x);
////	}
////}

verify.baselineFindAllReferences('0', '1', '2', '3')
