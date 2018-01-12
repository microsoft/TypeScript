//// [parserErrorRecoveryIfStatement1.ts]
class Foo {
  f1() {
    if (
  }
  f2() {
  }
  f3() {
  }
}

//// [parserErrorRecoveryIfStatement1.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.f1 = function () {
        if ()
            ;
    };
    Foo.prototype.f2 = function () {
    };
    Foo.prototype.f3 = function () {
    };
    return Foo;
}());
