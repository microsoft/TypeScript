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
var Foo = (function () {
    function Foo() {
    }
    var proto_1 = Foo.prototype;
    proto_1.f1 = function () {
        if (a.b)
            ;
    };
    proto_1.f2 = function () {
    };
    proto_1.f3 = function () {
    };
    return Foo;
}());
