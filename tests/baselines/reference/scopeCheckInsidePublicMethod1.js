//// [tests/cases/compiler/scopeCheckInsidePublicMethod1.ts] ////

//// [scopeCheckInsidePublicMethod1.ts]
class C {
   static s;
   public a() {
      s = 1; // ERR
   }
}

//// [scopeCheckInsidePublicMethod1.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.a = function () {
        s = 1; // ERR
    };
    return C;
}());
