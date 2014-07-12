/// <reference path='fourslash.ts'/>

////function apply<T, U extends Date>(source: T[], selector: (x: T) => U) {
////    var xs/*1*/ = source.map(selector); // any[]
////    var xs2/*2*/ = source.map((x: T, a, b): U => { return null }); // any[] 
////}

goTo.marker('1');
verify.quickInfoIs('U[]');

goTo.marker('2');
verify.quickInfoIs('U[]');

