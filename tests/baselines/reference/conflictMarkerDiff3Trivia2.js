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
    C.prototype.foo = function () {
        a();
    };
    C.prototype.bar = function () { };
    return C;
}());
