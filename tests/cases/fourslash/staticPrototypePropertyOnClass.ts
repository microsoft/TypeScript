/// <reference path='fourslash.ts'/>

////class c1 {
////}
////class c2<T> {
////}
////class c3 {
////    constructor() {
////    }
////}
////class c4 {
////    constructor(param: string);
////    constructor(param: number);
////    constructor(param: any) {
////    }
////}
////c1./*1*/prototype;
////c2./*2*/prototype;
////c3./*3*/prototype;
////c4./*4*/prototype;

goTo.marker('1');
verify.quickInfoIs("(property) c1.prototype: c1");
goTo.marker('2');
verify.quickInfoIs("(property) c2<T>.prototype: c2<any>");
goTo.marker('3');
verify.quickInfoIs("(property) c3.prototype: c3");
goTo.marker('4');
verify.quickInfoIs("(property) c4.prototype: c4");