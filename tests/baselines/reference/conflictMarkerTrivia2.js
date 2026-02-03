//// [tests/cases/compiler/conflictMarkerTrivia2.ts] ////

//// [conflictMarkerTrivia2.ts]
class C {
  foo() {
<<<<<<< B
     a();
  }
=======
     b();
  }
>>>>>>> A

  public bar() { }
}


//// [conflictMarkerTrivia2.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () {
        a();
    };
    C.prototype.bar = function () { };
    return C;
}());
