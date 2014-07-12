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
verify.quickInfoIs("c1", undefined, "c1.prototype", "property");
goTo.marker('2');
verify.quickInfoIs("c2<any>", undefined, "c2<T>.prototype", "property");
goTo.marker('3');
verify.quickInfoIs("c3", undefined, "c3.prototype", "property");
goTo.marker('4');
verify.quickInfoIs("c4", undefined, "c4.prototype", "property");