///<reference path="fourslash.ts"/>

////class A {
////    /*ctr*/constructor() {}
////    x() {}
////}
/////*B*/class B extends A {}
////class C extends B {
////    constructor() {
////        /*super*/super();
////    }
////    method() {
////        /*superExpression*/super.x();
////    }
////}
////class D {
////    constructor() {
////        /*superBroken*/super();
////    }
////}

// Super in call position goes to constructor.
goTo.marker("super");
goTo.definition();
verify.caretAtMarker("ctr");

// Super in any other position goes to the superclass.
goTo.marker("superExpression");
goTo.definition();
verify.caretAtMarker("B");

goTo.marker("superBroken");
verify.definitionCountIs(0);
