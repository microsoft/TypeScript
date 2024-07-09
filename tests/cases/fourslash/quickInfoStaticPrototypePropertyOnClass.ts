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

verify.quickInfos({
    1: "(property) c1.prototype: c1",
    2: "(property) c2<T>.prototype: c2<any>",
    3: "(property) c3.prototype: c3",
    4: "(property) c4.prototype: c4"
});
