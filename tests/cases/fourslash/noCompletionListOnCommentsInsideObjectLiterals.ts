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

verify.completions({ marker: test.markers(), exact: undefined });
