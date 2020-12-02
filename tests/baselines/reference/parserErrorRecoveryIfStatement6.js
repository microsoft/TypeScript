//// [parserErrorRecoveryIfStatement6.ts]
class Foo {
  f1() {
    if (a.b) {
  }
  public f2() {
  }
  f3() {
  }
}


//// [parserErrorRecoveryIfStatement6.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    var Foo_prototype = Foo.prototype;
    Foo_prototype.f1 = function () {
        if (a.b) {
        }
    };
    Foo_prototype.f2 = function () {
    };
    Foo_prototype.f3 = function () {
    };
    return Foo;
}());
