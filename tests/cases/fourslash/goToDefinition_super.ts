///<reference path="fourslash.ts"/>

////class A {
////    /*ctr*/constructor() {}
////    x() {}
////}
////class /*B*/B extends A {}
////class C extends B {
////    constructor() {
////        [|/*super*/super|]();
////    }
////    method() {
////        [|/*superExpression*/super|].x();
////    }
////}
////class D {
////    constructor() {
////        /*superBroken*/super();
////    }
////}


verify.baselineGoToDefinition(
    // Super in call position goes to constructor.
    "super",
    // Super in any other position goes to the superclass.
    "superExpression",
    "superBroken",
);
