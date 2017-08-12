//// [conflictMarkerDiff3Trivia2.ts]
class C {
  foo() {
<<<<<<< B
     a();
  }
||||||| merged common ancestors
     c();
  }
=======
     b();
  }
>>>>>>> A

  public bar() { }
}


//// [conflictMarkerDiff3Trivia2.js]
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
