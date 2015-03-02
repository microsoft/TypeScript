/// <reference path='fourslash.ts'/>

////module ObjectLiterals {
////	interface MyPoint {
////		x1: number;
////		y1: number;
////	}
////
////	var p1: MyPoint = {
////		/* /*1*/ Comment /*2*/ */
////	};
////}

goTo.marker("1");
verify.completionListIsEmpty();

goTo.marker("2");
verify.completionListIsEmpty();