/// <reference path='fourslash.ts'/>

////function foo4<T extends Date>(te/**/st: T): T;
////function foo4<T extends Date>(test: any): any { return null; }

verify.quickInfoAt("", "(parameter) test: T extends Date");
