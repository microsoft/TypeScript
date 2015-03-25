/// <reference path='fourslash.ts'/>

////interface Iterator<T, U> {
////    (value: T, index: any, list: any): U
////}
////var i: Iterator<string, number>;
////i/**/

goTo.marker();
verify.completionListContains('i', 'var i: Iterator<string, number>');
