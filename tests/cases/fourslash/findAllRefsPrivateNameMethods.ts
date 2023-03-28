/// <reference path='fourslash.ts'/>

////class C {
////    /*1*/#foo(){ }
////    constructor() {
////        this./*2*/#foo();
////    }
////}
////class D extends C {
////    constructor() {
////        super()
////        this.#foo = 20;
////    }
////}
////class E {
////    /*3*/#foo(){ }
////    constructor() {
////        this./*4*/#foo();
////    }
////}

verify.baselineFindAllReferences('1', '2', '3', '4');
