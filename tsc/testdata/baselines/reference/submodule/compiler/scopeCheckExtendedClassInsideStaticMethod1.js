//// [tests/cases/compiler/scopeCheckExtendedClassInsideStaticMethod1.ts] ////

//// [scopeCheckExtendedClassInsideStaticMethod1.ts]
class C { private v; public p; static s; }
class D extends C {
   static c() {
      v = 1;
      this.p = 1;
      s = 1;
   }
}

//// [scopeCheckExtendedClassInsideStaticMethod1.js]
class C {
    v;
    p;
    static s;
}
class D extends C {
    static c() {
        v = 1;
        this.p = 1;
        s = 1;
    }
}
