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

goTo.marker('1');
verify.signatureHelpPresent();
verify.currentSignatureHelpIs('B(): B');

goTo.marker('2');
verify.currentSignatureHelpIs('B2(x: number): B2');