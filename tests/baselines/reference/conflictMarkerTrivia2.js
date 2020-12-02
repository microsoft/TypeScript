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
    var C_prototype = C.prototype;
    C_prototype.foo = function () {
        a();
    };
    C_prototype.bar = function () { };
    return C;
}());
