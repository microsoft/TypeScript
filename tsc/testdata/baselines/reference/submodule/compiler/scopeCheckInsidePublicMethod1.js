//// [tests/cases/compiler/scopeCheckInsidePublicMethod1.ts] ////

//// [scopeCheckInsidePublicMethod1.ts]
class C {
   static s;
   public a() {
      s = 1; // ERR
   }
}

//// [scopeCheckInsidePublicMethod1.js]
class C {
    static s;
    a() {
        s = 1; // ERR
    }
}
