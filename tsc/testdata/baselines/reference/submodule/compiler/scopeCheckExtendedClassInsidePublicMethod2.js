//// [tests/cases/compiler/scopeCheckExtendedClassInsidePublicMethod2.ts] ////

//// [scopeCheckExtendedClassInsidePublicMethod2.ts]
class C { private v; public p; static s; }
class D extends C {
   public c() {
      v = 1;
      this.p = 1;
      s = 1;
   }
}

//// [scopeCheckExtendedClassInsidePublicMethod2.js]
class C {
    v;
    p;
    static s;
}
class D extends C {
    c() {
        v = 1;
        this.p = 1;
        s = 1;
    }
}
