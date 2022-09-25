/// <reference path="fourslash.ts" />


////class A {
////    /*a*/constructor(s: string) {}
////}
////class B extends A {
////    /*b*/constructor() { super(""); }
////}
////class C extends B {
////    /*c*/constructor() {
////        super();
////    }
////}
////class D extends B { }
////const a = new A("a");
////const b = new B();
////const c = new C();
////const d = new D();

verify.noErrors();
verify.baselineFindAllReferences('a', 'b', 'c')
