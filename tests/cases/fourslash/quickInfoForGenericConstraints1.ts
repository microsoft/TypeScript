/// <reference path='fourslash.ts'/>

////function foo4<T extends Date>(te/**/st: T): T;
////function foo4<T extends Date>(test: any): any { return null; }

goTo.marker();
// TODO: formatting type parameter with extends info
//verify.quickInfoIs('parameter) test: T extends Date');
verify.quickInfoIs('(parameter) test: T');