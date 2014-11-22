/// <reference path='fourslash.ts'/>

////var x: string|number;
////var r = x.length && x./*1*/substr
////var y: Array<string>|Array<number>|Date = [''];
////var r2 = y.length ? y./*2*/filter : y./*3*/getDate;
////if (y.length) { var r3 = y.filter/*4*/; }
////var r4 = x.length || x.toFixed/*5*/; 
////var r5 = y./*6*/length || y./*7*/getDate(); 

goTo.marker('1');
verify.completionListContains('substr');
verify.not.completionListContains('toFixed');
goTo.marker('2');
verify.completionListContains('filter');
verify.not.completionListContains('getDate');
goTo.marker('3');
verify.not.completionListContains('filter');
verify.completionListContains('getDate');
goTo.marker('4');
verify.completionListContains('filter');
verify.not.completionListContains('getDate');
goTo.marker('5');
verify.completionListContains('toFixed');
verify.not.completionListContains('substr');
goTo.marker('6');
verify.completionListContains('toString');
verify.not.completionListContains('length');
goTo.marker('7');
verify.completionListContains('getDate');
verify.not.completionListContains('filter');
