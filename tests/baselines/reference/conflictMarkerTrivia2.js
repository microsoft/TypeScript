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
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function () {
        a();
    };
    proto_1.bar = function () { };
    return C;
}());
