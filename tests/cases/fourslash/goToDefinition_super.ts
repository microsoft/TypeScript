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


verify.goToDefinition({
    // Super in call position goes to constructor.
    super: ["ctr", "B"],
    // Super in any other position goes to the superclass.
    superExpression: "B",
    superBroken: []
});
