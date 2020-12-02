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
    var Foo_prototype = Foo.prototype;
    Foo_prototype.f1 = function () {
        if ()
            ;
    };
    Foo_prototype.f2 = function () {
    };
    Foo_prototype.f3 = function () {
    };
    return Foo;
}());
