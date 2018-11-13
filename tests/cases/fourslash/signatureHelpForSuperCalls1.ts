/// <reference path='fourslash.ts'/>

////class A { }
////class B extends A { }
////class C extends B {
////    constructor() {
////        super(/*1*/ // sig help here?
////    }
////}
////class A2 { }
////class B2 extends A2 {
////    constructor(x:number) {}
//// }
////class C2 extends B2 {
////    constructor() {
////        super(/*2*/ // sig help here?
////    }
////}

verify.signatureHelp(
    { marker: "1", text: "B(): B" },
    { marker: "2", text: "B2(x: number): B2" },
);
