/// <reference path="fourslash.ts" />


////class A {
////    /*aCtr*/constructor(s: string) {}
////}
////class B extends A { }
////class C extends B {
////    /*cCtr*/constructor() {
////        super("");
////    }
////}
////class D extends B { }
////class E implements A { }
////const a = new A("a");
////const b = new B("b");
////const c = new C();
////const d = new D("d");
////const e = new E();

verify.noErrors();
verify.baselineFindAllReferences('aCtr', 'cCtr')
