//// [tests/cases/compiler/scopeCheckInsideStaticMethod1.ts] ////

//// [scopeCheckInsideStaticMethod1.ts]
class C {
   private v;
   public p;
   static s;
   static b() {
      v = 1; // ERR
      C.s = 1;
      this.p = 1; // ERR
   }
}

//// [scopeCheckInsideStaticMethod1.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.b = function () {
        v = 1; // ERR
        C.s = 1;
        this.p = 1; // ERR
    };
    return C;
}());
