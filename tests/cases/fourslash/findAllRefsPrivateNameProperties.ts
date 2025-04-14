/// <reference path='fourslash.ts'/>

////class C {
////    /*1*/#foo = 10;
////    constructor() {
////        this./*2*/#foo = 20;
////        /*3*/#foo in this;
////    }
////}
////class D extends C {
////    constructor() {
////        super()
////        this.#foo = 20;
////    }
////}
////class E {
////    /*4*/#foo: number;
////    constructor() {
////        this./*5*/#foo = 20;
////    }
////}

verify.baselineFindAllReferences('1', '2', '3', '4', '5');
