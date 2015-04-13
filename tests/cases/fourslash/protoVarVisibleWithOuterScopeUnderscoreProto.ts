/// <reference path='fourslash.ts' />

////// outer
////var ___proto__ = 10;
////function foo() {
////    var __proto__ = "hello";
////    /**/
////}

goTo.marker('');
verify.completionListContains("__proto__", '(local var) __proto__: string');
verify.completionListContains("___proto__", 'var ___proto__: number');
