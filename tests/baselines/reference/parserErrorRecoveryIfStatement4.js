//// [parserErrorRecoveryIfStatement4.ts]
class Foo {
  f1() {
    if (a.b)
  }
  f2() {
  }
  f3() {
  }
}

//// [parserErrorRecoveryIfStatement4.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.f1 = function () {
        if (a.b)
            ;
    };
    Foo.prototype.f2 = function () {
    };
    Foo.prototype.f3 = function () {
    };
    return Foo;
}());
