/// <reference path='fourslash.ts'/>

////function foo4<T extends Date>(te/**/st: T): T;
////function foo4<T extends Date>(test: any): any { return null; }

goTo.marker();
verify.quickInfoIs('T extends Date');