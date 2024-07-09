//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/IfStatements/parserErrorRecoveryIfStatement2.ts] ////

//// [parserErrorRecoveryIfStatement2.ts]
class Foo {
  f1() {
    if (a
  }
  f2() {
  }
  f3() {
  }
}

//// [parserErrorRecoveryIfStatement2.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.f1 = function () {
        if (a)
            ;
    };
    Foo.prototype.f2 = function () {
    };
    Foo.prototype.f3 = function () {
    };
    return Foo;
}());
