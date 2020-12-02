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
